const STATS = [
  {
    value: '10x',
    label: 'Faster reporting cycles',
    detail: 'Replace manual spreadsheet wrangling with dashboards that update themselves.',
  },
  {
    value: '85%',
    label: 'Less manual data prep',
    detail: 'Automated pipelines keep every metric clean, current, and ready to query.',
  },
  {
    value: '3x',
    label: 'Faster time to insight',
    detail: 'AI-assisted analysis turns questions into answers in seconds, not days.',
  },
];

export function Stats() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight vf-text-navy sm:text-4xl">
            Turn data into better business outcomes.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Finance and operations teams use VectiFi to move from raw, scattered data to
            confident decisions — with a single source of truth everyone can trust.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-4 text-center md:px-8 ${i > 0 ? 'md:border-l md:border-border/60' : ''}`}
            >
              <div className="text-5xl font-bold vf-gradient-text">{stat.value}</div>
              <div className="mt-3 text-base font-semibold vf-text-navy">{stat.label}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
