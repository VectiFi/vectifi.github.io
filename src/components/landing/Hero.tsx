import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="top"
      className="vf-hero-dark relative flex items-center overflow-hidden md:min-h-[88vh]"
    >
      <div className="container relative mx-auto w-full px-4 pb-20 pt-28 sm:px-6 md:pb-28 md:pt-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5rem]">
              Turn raw data into <span className="vf-text-light">decisions</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
              VectiFi connects your business data, builds interactive dashboards in
              minutes, and surfaces AI-assisted insights your whole team can act on —
              no SQL, no spreadsheets, no waiting on analysts.
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

          <div className="relative">
            <div className="vf-hero-glow absolute -inset-10 -z-10 blur-2xl" />
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/40 ring-1 ring-white/15">
              <ImageWithFallback
                src="/placeholder-dashboard.svg"
                alt="VectiFi interactive analytics dashboard"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
