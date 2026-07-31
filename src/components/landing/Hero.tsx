import { Button } from '../ui/button';
import { HeroFigure } from './HeroFigure';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="top"
      className="vf-hero-dark relative flex items-center overflow-hidden md:min-h-[88vh]"
    >
      <div className="container relative mx-auto w-full px-4 pb-20 pt-28 sm:px-6 md:pb-28 md:pt-32">
        {/* Badge and headline span the full container: the one-line headline is
            wider than any half column can hold at its size. */}
        <p className="inline-flex items-center gap-2.5 rounded-full border border-[#7DC4A0]/40 bg-[#7DC4A0]/15 px-5 py-2 text-base font-semibold text-[#C9EEDD] shadow-[0_0_28px_rgba(125,196,160,0.35)] sm:gap-3 sm:px-6 sm:py-2.5 sm:text-lg">
          <Sparkles className="h-5 w-5 text-[#7DC4A0]" />
          Turn raw data into decisions
        </p>
        <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5rem]">
          AI-native <span className="vf-gradient-text-hero">Business Analytics</span>
        </h1>

        <div className="mt-8 grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-xl lg:pt-16">
            <p className="max-w-lg text-xl leading-relaxed text-white/70">
              VectiFi connects your business data, builds interactive dashboards in
              minutes, and gives every decision maker an AI analyst on call.
              No SQL, no spreadsheets, no waiting.
            </p>
            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <Button
                asChild
                className="vf-cta-light h-14 rounded-full pl-8 pr-2 text-base font-semibold"
              >
                <a href="#cta">
                  Get Started
                  <span className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#0B4A30]">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </span>
                </a>
              </Button>
              <a
                href="#features"
                className="group inline-flex items-center gap-2 text-base font-medium vf-text-light transition-colors hover:text-white"
              >
                See how it works
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Uniform scale: the mock's height is content-driven, so width caps
              alone narrow it without shortening it toward the text column. */}
          <div className="lg:origin-top lg:scale-[0.8] lg:pt-12">
            <HeroFigure />
          </div>
        </div>
      </div>
    </section>
  );
}
