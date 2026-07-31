import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Check } from 'lucide-react';

interface FeatureProps {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

export function Feature({
  eyebrow,
  title,
  description,
  bullets,
  imageSrc,
  imageAlt,
  reverse = false,
}: FeatureProps) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <div className={reverse ? 'lg:order-2' : ''}>
        <p className="text-sm font-semibold uppercase tracking-wide vf-text-blue">{eyebrow}</p>
        <h3 className="mt-3 text-3xl font-bold tracking-tight vf-text-navy sm:text-4xl">{title}</h3>
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

      <div className={reverse ? 'lg:order-1' : ''}>
        <div className="relative">
          <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-tr from-green-100/50 to-emerald-50/40 blur-xl" />
          <ImageWithFallback
            src={imageSrc}
            alt={imageAlt}
            className="aspect-[4/3] w-full rounded-2xl border border-border/60 bg-white object-cover shadow-xl shadow-green-900/10"
          />
        </div>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="vf-section vf-wash py-20 md:py-28">
      <div className="container mx-auto space-y-24 px-4 sm:px-6">
        <Feature
          eyebrow="Interactive dashboards"
          title="Dashboards your whole team can read."
          description="Drag, drop, and drill down. VectiFi turns connected data into live dashboards that anyone can explore — from the CFO to the new analyst — without writing a single query."
          bullets={[
            'Build boards in minutes with no-code visual tools',
            'Filter, slice, and drill down on any metric in real time',
            'Share read-only views with stakeholders securely',
          ]}
          imageSrc="/placeholder-feature-dashboards.svg"
          imageAlt="VectiFi interactive dashboard builder"
        />
        <Feature
          reverse
          eyebrow="AI-assisted insights"
          title="Ask questions. Get answers, not spreadsheets."
          description="VectiFi's AI analyst watches your data, flags what changed, and explains why — in plain language. Ask follow-up questions and get charts, trends, and recommendations on demand."
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
