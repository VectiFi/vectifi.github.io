import type { ReactNode } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Check } from 'lucide-react';
import { DashboardFigure } from './DashboardFigure';

interface FeatureProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  bullets: string[];
  figure?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  reverse?: boolean;
}

export function Feature({
  eyebrow,
  title,
  description,
  bullets,
  figure,
  imageSrc,
  imageAlt,
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
          {figure ??
            (imageSrc && (
              <ImageWithFallback
                src={imageSrc}
                alt={imageAlt ?? ''}
                className="aspect-[4/3] w-full rounded-2xl border border-border/60 bg-white object-cover shadow-xl shadow-green-900/10"
              />
            ))}
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
          title="Ask questions. Get answers, not spreadsheets."
          description="VectiFi's AI analyst watches your data, flags what changed, and explains why in plain language. Ask follow-up questions and get charts, trends, and recommendations on demand."
          bullets={[
            'Natural-language queries across all your data',
            'Automatic anomaly detection and trend alerts',
            'Narrated explanations you can drop into any report',
          ]}
          imageSrc="/placeholder-feature-ai.svg"
          imageAlt="VectiFi AI-assisted insights panel"
        />
      </div>
    </section>
  );
}
