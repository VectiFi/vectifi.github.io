import { AppWindow } from './hero-figure/AppWindow';
import { AskCard, InsightCard } from './hero-figure/FloatingCards';

/**
 * Illustrative product mock for the hero. Everything here is invented — no real
 * workspace, customer, or figure from the product appears.
 *
 * Built as markup rather than an <img>, so it renders in the site's own
 * self-hosted Inter and stays crisp at any density.
 */

function Sparkle({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0c.6 5.9 5.5 10.8 11.4 11.4v1.2C17.5 13.2 12.6 18.1 12 24h-1.2C10.2 18.1 5.3 13.2-.6 12.6v-1.2C5.3 10.8 10.2 5.9 10.8 0H12Z" />
    </svg>
  );
}

export function HeroFigure() {
  return (
    <div
      role="img"
      aria-label="Illustration of the VectiFi app: a dashboard of revenue and margin metrics built from a plain-language question, with an AI-written insight alongside it."
      className="relative mx-auto w-full max-w-[36rem] lg:max-w-[33rem]"
    >
      {/*
        No negative z-index here: the hero <section> is positioned but sets no
        z-index, so it is not a stacking context and -z-10 would drop this
        behind the section's own background. The window and cards come later in
        the DOM and are positioned, so they paint on top regardless.
      */}
      <div aria-hidden className="pointer-events-none absolute -inset-x-20 -inset-y-28">
        <div className="vf-hero-glow absolute inset-12 blur-2xl" />
        <svg viewBox="0 0 600 520" className="h-full w-full" fill="none">
          <circle
            cx="300"
            cy="260"
            r="252"
            stroke="#7DC4A0"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            strokeDasharray="2 8"
          />
          <circle
            cx="300"
            cy="260"
            r="198"
            stroke="#7DC4A0"
            strokeOpacity="0.22"
            strokeWidth="1.5"
            strokeDasharray="2 8"
          />
        </svg>
        <Sparkle className="absolute left-[8%] top-[26%] h-4 w-4 text-[#7DC4A0]/70" />
        <Sparkle className="absolute right-[11%] top-[11%] h-5 w-5 text-[#7DC4A0]/60" />
        <Sparkle className="absolute bottom-[18%] right-[19%] h-3.5 w-3.5 text-[#7DC4A0]/60" />
      </div>

      <AppWindow />
      <AskCard />
      <InsightCard />
    </div>
  );
}
