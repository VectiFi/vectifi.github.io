import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.ts";

const app = new Hono();

app.use("*", logger(console.log));

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

app.get("/make-server-0a93cb36/health", (c) => {
  return c.json({ status: "ok" });
});

// Pinged on a schedule by .github/workflows/keepalive.yml.
//
// Deliberately performs a real database read: free-tier projects are paused for
// *database* inactivity, and /health above answers from memory without touching
// Postgres, so pinging that alone would not have kept the project awake.
//
// Reports db:false rather than throwing, so the caller can tell "function is up
// but the database is not answering" from "the whole project is gone".
app.get("/make-server-0a93cb36/keepalive", async (c) => {
  try {
    await kv.get("keepalive:probe");
    return c.json({ status: "ok", db: true, at: new Date().toISOString() });
  } catch (error) {
    console.log(`Keepalive database read failed: ${error}`);
    return c.json({ status: "degraded", db: false, error: String(error) }, 503);
  }
});

app.post("/make-server-0a93cb36/submit-email", async (c) => {
  try {
    const body = await c.req.json();
    const email: string | undefined = body.email;

    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    // Store the submission
    const timestamp = new Date().toISOString();
    const key = `beta-signup:${timestamp}:${email}`;
    await kv.set(key, { email, timestamp });

    // Notification recipient: request body wins, otherwise NOTIFY_EMAIL secret.
    const notifyEmail: string | undefined = body.notifyEmail ?? Deno.env.get("NOTIFY_EMAIL");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey || !notifyEmail) {
      console.log("Email stored; notification skipped (missing RESEND_API_KEY or NOTIFY_EMAIL).");
      return c.json({ success: true, message: "Email stored successfully", notificationSent: false });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "VectiFi Beta <beta@vectifi.com>",
        to: [notifyEmail],
        subject: "New VectiFi Beta Signup",
        html: `
          <h2>New Beta Launch Signup</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString()}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.log(`Resend API error: ${errorData}`);
      return c.json(
        { success: true, message: "Email stored but notification failed to send", notificationSent: false, error: errorData },
        200,
      );
    }

    return c.json({ success: true, message: "Email submitted and notification sent successfully", notificationSent: true });
  } catch (error) {
    console.log(`Error in submit-email endpoint: ${error}`);
    return c.json({ error: "Failed to process email submission", details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
