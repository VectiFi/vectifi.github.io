/* Key-value store backed by Postgres table kv_store_0a93cb36.

Table schema:
CREATE TABLE kv_store_0a93cb36 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);
*/
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

const client = () =>
  createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

export const set = async (key: string, value: unknown): Promise<void> => {
  const supabase = client();
  const { error } = await supabase.from("kv_store_0a93cb36").upsert({ key, value });
  if (error) {
    throw new Error(error.message);
  }
};

export const get = async (key: string): Promise<unknown> => {
  const supabase = client();
  const { data, error } = await supabase
    .from("kv_store_0a93cb36")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  if (error) {
    throw new Error(error.message);
  }
  return data?.value;
};

export const getByPrefix = async (prefix: string): Promise<unknown[]> => {
  const supabase = client();
  const { data, error } = await supabase
    .from("kv_store_0a93cb36")
    .select("key, value")
    .like("key", prefix + "%");
  if (error) {
    throw new Error(error.message);
  }
  return data?.map((d) => d.value) ?? [];
};
