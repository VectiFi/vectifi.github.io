import { EmailForm } from '../EmailForm';
import { Card } from '../ui/card';
import { ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import { Logo } from '../Logo';

const HIGHLIGHTS = [
  { icon: Zap, label: 'Live in minutes', detail: 'Connect a source and see your first dashboard today.' },
  { icon: BarChart3, label: 'Built for finance', detail: 'Purpose-built for FP&A, reporting, and BI workflows.' },
  { icon: ShieldCheck, label: 'Secure by design', detail: 'Encryption in transit and at rest, SOC 2 aligned.' },
];

export function CTA() {
  return (
    <section id="cta" className="vf-wash py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight vf-text-navy sm:text-4xl">
              Ready to see VectiFi in action?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join the beta and be among the first teams to turn raw data into
              interactive dashboards and AI-assisted insights.
            </p>
            <ul className="mt-8 space-y-5">
              {HIGHLIGHTS.map(({ icon: Icon, label, detail }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-green-100">
                    <Icon className="h-5 w-5 vf-text-blue" />
                  </span>
                  <div>
                    <div className="font-semibold vf-text-navy">{label}</div>
                    <div className="text-sm text-muted-foreground">{detail}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Card className="border-border/60 p-6 shadow-xl shadow-green-900/10 sm:p-8">
            <div className="mb-6 flex flex-col items-center text-center">
              <Logo variant="icon" className="mb-3 h-12 w-12" />
              <h3 className="text-xl font-bold vf-text-navy">Request beta access</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Use your work email to join the exclusive beta launch.
              </p>
            </div>
            <EmailForm />
          </Card>
        </div>
      </div>
    </section>
  );
}
