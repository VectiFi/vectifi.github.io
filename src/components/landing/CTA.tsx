import { EmailForm } from '../EmailForm';
import { Card } from '../ui/card';
import { ShieldCheck, Zap, BarChart3, Mail } from 'lucide-react';
import { Logo } from '../Logo';

const CONTACT_EMAIL = 'sysadmin@vectifi.com';

const HIGHLIGHTS = [
  { icon: Zap, label: 'Live in minutes', detail: 'Connect a source and see your first dashboard today.' },
  { icon: BarChart3, label: 'Built for finance and operations', detail: 'Purpose-built for BI, reporting, finance, and operations workflows.' },
  { icon: ShieldCheck, label: 'Secure by design', detail: 'Encryption in transit and at rest, SOC 2 aligned.' },
];

export function CTA() {
  return (
    <section id="cta" className="vf-section vf-wash py-20 md:py-28">
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
            <div className="mb-4 flex items-center justify-center gap-3">
              <Logo variant="icon" className="h-10 w-10" />
              <h3 className="text-xl font-bold vf-text-navy">Request beta access</h3>
            </div>
            <EmailForm />

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">or</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 vf-text-blue" />
              <span>Reach out directly at</span>
              <span className="select-all font-medium vf-text-blue">{CONTACT_EMAIL}</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
