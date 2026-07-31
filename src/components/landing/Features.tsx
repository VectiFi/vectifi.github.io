import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { DashboardFigure } from './DashboardFigure';
import { ReportFigure } from './ReportFigure';

interface FeatureProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  bullets: string[];
  figure: ReactNode;
  reverse?: boolean;
}

export function Feature({
  eyebrow,
  title,
  description,
  bullets,
  figure,
  reverse = false,
}: FeatureProps) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <div className={`min-w-0 ${reverse ? 'lg:order-2' : ''}`}>
        <p className="text-sm font-semibold uppercase tracking-wide vf-text-blue">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight vf-text-navy sm:text-4xl">{title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>
        <ul className="mt-6 space-y-3">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                <Check className="h-3.5 w-3.5 vf-text-blue" />
              </span>
              <span className="text-base text-foreground">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`min-w-0 ${reverse ? 'lg:order-1' : ''}`}>
        <div className="relative">
          <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-tr from-green-100/50 to-emerald-50/40 blur-xl" />
          {figure}
        </div>
      </div>
    </div>
  );
}

/** Section 1: Interactive dashboards. Carries id="features" for nav links. */
export function DashboardsFeature() {
  return (
    <section id="features" className="vf-section vf-wash py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <Feature
          reverse
          eyebrow="Interactive dashboards"
          title={
            <>
              All your data. <span className="vf-gradient-text-light">No overhead.</span>
            </>
          }
          description="Describe the dashboard you want in plain English and VectiFi's AI builds it live from your connected data. No BI backlog, no request queue, no specialist army on payroll. The cost of insight drops to a sentence."
          bullets={[
            'Describe a dashboard in plain English and the AI builds it from live data',
            'Cut reporting costs: no SQL, no BI specialists, no maintenance backlog',
            'Share read-only views with stakeholders securely',
          ]}
          figure={<DashboardFigure />}
        />
      </div>
    </section>
  );
}

/** Section 3: AI-assisted insights. */
export function InsightsFeature() {
  return (
    <section id="insights" className="vf-section vf-wash py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <Feature
          reverse
          eyebrow="AI-assisted insights"
          title={
            <>
              Reports that write themselves.{' '}
              <span className="vf-gradient-text-light">Insights before you ask.</span>
            </>
          }
          description="VectiFi's AI analyst watches your data, connects it with market news and your company context, and explains what changed in plain language. Customize the report, or request a new cut whenever you need one."
          bullets={[
            'Reads your whole business as one, market news and company context included',
            'Customize the report or request a new cut in plain English',
            'Narrated explanations you can drop into any report',
          ]}
          figure={<ReportFigure />}
        />
      </div>
    </section>
  );
}
