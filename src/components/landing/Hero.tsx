import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="top" className="vf-wash relative overflow-hidden">
      <div className="container mx-auto px-4 py-20 sm:px-6 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-xl">
            <Badge variant="secondary" className="mb-5 rounded-full px-3 py-1 text-xs font-medium vf-text-blue">
              AI-native financial analytics
            </Badge>
            <h1 className="text-4xl font-bold leading-tight tracking-tight vf-text-navy sm:text-5xl md:text-6xl">
              Turn raw data into <span className="vf-gradient-text">decisions.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              VectiFi connects your business data, builds interactive dashboards in
              minutes, and surfaces AI-assisted insights your whole team can act on —
              no SQL, no spreadsheets, no waiting on analysts.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="vf-cta-gradient h-12 px-7 text-base text-white">
                <a href="#cta">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-7 text-base">
                <a href="#features">See how it works</a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-green-200/40 to-emerald-100/30 blur-2xl" />
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-2xl shadow-green-900/10">
              <div className="flex items-center gap-1.5 border-b border-border/60 bg-secondary/40 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                <span className="h-3 w-3 rounded-full bg-green-400/70" />
                <span className="ml-3 text-xs text-muted-foreground">app.vectifi.com/dashboard</span>
              </div>
              <ImageWithFallback
                src="/placeholder-dashboard.png"
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
