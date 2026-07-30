import { ImageWithFallback } from '../figma/ImageWithFallback';

const LOGOS = ['Northwind', 'Meridian'];

export function LogoCloud() {
  return (
    <section id="customers" className="border-b border-border/60 bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <p className="text-center text-sm text-muted-foreground">
          Powering data-driven finance teams at
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
          {LOGOS.map((name) => (
            <div key={name} className="flex items-center gap-2 opacity-70 grayscale">
              <ImageWithFallback
                src={`/placeholder-logo-${name}.svg`}
                alt={`${name} logo`}
                className="h-7 w-7 rounded"
              />
              <span className="text-lg font-semibold vf-text-navy">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
