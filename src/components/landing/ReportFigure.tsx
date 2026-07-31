import { ArrowUp, FileText, Lightbulb, ListChecks, Sparkles, TrendingUp } from 'lucide-react';
import { useInView } from './useInView';

/** Greeked placeholder line, same idea as the hero figure's text bars. */
function Bar({ className }: { className: string }) {
  return <span aria-hidden className={`block h-1.5 rounded-full bg-slate-200/80 ${className}`} />;
}

// The report is customized per reader; these chips carry that story.
const SCOPE_CHIPS = ['Exec weekly', 'Retention focus', 'SSO-launch context'];

// One connected storyline across internal data, fetched news, and company
// context: a heavy renewal quarter, strained accounts, a competitor price cut,
// and the shipped feature that becomes the play. All figures are invented.
const REPORT_ROWS: Array<{
  signal: string;
  source: string;
  kind: 'internal' | 'news' | 'context';
  impact: string;
  tone: 'up' | 'down' | 'neutral';
}> = [
  { signal: 'Q4 enterprise renewals total $1.9M', source: 'Billing', kind: 'internal', impact: '3× normal load', tone: 'neutral' },
  { signal: 'Tickets from top-tier accounts up 22%', source: 'Support', kind: 'internal', impact: '8 accounts at risk', tone: 'down' },
  { signal: 'Competitor cut enterprise prices 10%', source: 'News', kind: 'news', impact: 'Renewal pressure', tone: 'down' },
  { signal: 'NRR held at 108% through June', source: 'Billing', kind: 'internal', impact: 'Base is healthy', tone: 'up' },
  { signal: 'SSO shipped to every plan last week', source: 'Context', kind: 'context', impact: 'Retention lever', tone: 'up' },
];

const IMPACT_TONE: Record<(typeof REPORT_ROWS)[number]['tone'], string> = {
  up: 'text-[#1A8C62]',
  down: 'text-rose-500',
  neutral: 'text-slate-500',
};

const SOURCE_CHIP: Record<(typeof REPORT_ROWS)[number]['kind'], string> = {
  internal: 'bg-slate-200/70 text-slate-500',
  news: 'bg-[#1A8C62]/10 text-[#1A8C62]',
  context: 'bg-[#0B4A30]/10 text-[#0B4A30]',
};

/**
 * Section 3 figure: the weekly AI-generated report. Customization chips, a
 * signal table mixing internal data, fetched news, and company context, the
 * plain-language read of it, and a request bar for a different cut.
 * Markup instead of an SVG file so it renders in the site's fonts.
 */
export function ReportFigure() {
  const [figureRef, inView] = useInView<HTMLDivElement>(0.2);

  // Entry keeps the stagger; exit snaps while fully off-screen (same reset
  // rule as DashboardFigure) so the replay always starts clean.
  const anim = (delayMs: number) =>
    inView
      ? { transitionDelay: `${delayMs}ms` }
      : { transitionDelay: '0ms', transitionDuration: '0s' };

  return (
    <div
      ref={figureRef}
      role="img"
      aria-label="Illustration of a customized VectiFi weekly insight report: scope chips, a table of business signals mixing internal metrics, fetched news, and company context, the AI's plain-language summary, and a bar for requesting a different report. All figures are invented."
      className="flex flex-col gap-3.5 rounded-2xl border border-border/60 bg-white p-5 shadow-xl shadow-green-900/10 sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#1A8C62]">
          <FileText className="h-4 w-4" />
          Weekly insight report
        </p>
        <span className="shrink-0 text-[11px] font-medium text-slate-400">
          Auto-generated · Mon 8:00
        </span>
      </div>

      <div
        className="flex flex-wrap items-center gap-2 transition-opacity duration-700 motion-reduce:transition-none"
        style={{ opacity: inView ? 1 : 0, ...anim(150) }}
      >
        <span className="text-[11px] font-medium text-slate-400">Customized:</span>
        {SCOPE_CHIPS.map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-border/60 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-500"
          >
            {chip}
          </span>
        ))}
      </div>

      <div
        className="rounded-xl border border-border/60 bg-slate-50/60 p-3 transition-[opacity,transform] duration-600 ease-out motion-reduce:transition-none"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : 'translateY(8px)',
          ...anim(300),
        }}
      >
        <div className="grid grid-cols-[1.7fr_0.6fr_1fr] gap-2 border-b border-border/60 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          <span>Signal</span>
          <span>Source</span>
          <span className="text-right">Impact</span>
        </div>
        <div className="mt-1.5 space-y-2">
          {REPORT_ROWS.map((row, i) => (
            <div
              key={row.signal}
              className="grid grid-cols-[1.7fr_0.6fr_1fr] items-baseline gap-2 text-xs transition-opacity duration-900 motion-reduce:transition-none"
              style={{ opacity: inView ? 1 : 0, ...anim(500 + i * 130) }}
            >
              <span className="truncate text-slate-600">{row.signal}</span>
              <span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${SOURCE_CHIP[row.kind]}`}
                >
                  {row.source}
                </span>
              </span>
              <span className={`text-right font-medium ${IMPACT_TONE[row.tone]}`}>
                {row.impact}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-xl border border-[#1A8C62]/20 bg-[#1A8C62]/5 p-3.5 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : 'translateY(8px)',
          ...anim(1350),
        }}
      >
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[#1A8C62]">
          <Sparkles className="h-3.5 w-3.5" />
          In plain language
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">
          Q4 carries three times the usual renewal load just as a competitor cuts prices.
          Your SSO launch is the lever: lead every renewal conversation with it.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div
          className="rounded-xl border border-border/60 bg-slate-50/60 p-3 transition-[opacity,transform] duration-600 ease-out motion-reduce:transition-none"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(8px)',
            ...anim(1800),
          }}
        >
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            <TrendingUp className="h-3.5 w-3.5 text-[#1A8C62]" />
            Highlights
          </p>
          <div className="mt-2.5 space-y-2">
            <Bar className="w-11/12" />
            <Bar className="w-4/5" />
            <Bar className="w-3/5" />
          </div>
        </div>
        <div
          className="rounded-xl border border-border/60 bg-slate-50/60 p-3 transition-[opacity,transform] duration-600 ease-out motion-reduce:transition-none"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(8px)',
            ...anim(1950),
          }}
        >
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            <Lightbulb className="h-3.5 w-3.5 text-[#1A8C62]" />
            Opportunities
          </p>
          <div className="mt-2.5 space-y-2">
            <Bar className="w-4/5" />
            <Bar className="w-11/12" />
            <Bar className="w-1/2" />
          </div>
        </div>
      </div>

      <div
        className="rounded-xl border border-border/60 bg-slate-50/60 p-3 transition-[opacity,transform] duration-600 ease-out motion-reduce:transition-none"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : 'translateY(8px)',
          ...anim(2150),
        }}
      >
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          <ListChecks className="h-3.5 w-3.5 text-[#1A8C62]" />
          Suggested actions
        </p>
        <ul className="mt-2 space-y-2">
          <li
            className="flex items-center gap-2 text-xs text-slate-600 transition-opacity duration-700 motion-reduce:transition-none"
            style={{ opacity: inView ? 1 : 0, ...anim(2350) }}
          >
            <span className="h-3.5 w-3.5 shrink-0 rounded-[4px] border-[1.5px] border-[#1A8C62]/50" />
            Brief CS on outreach to the 8 flagged accounts
          </li>
          {(['w-52', 'w-40'] as const).map((w, i) => (
            <li
              key={w}
              className="flex items-center gap-2 transition-opacity duration-700 motion-reduce:transition-none"
              style={{ opacity: inView ? 1 : 0, ...anim(2480 + i * 130) }}
            >
              <span className="h-3.5 w-3.5 shrink-0 rounded-[4px] border-[1.5px] border-[#1A8C62]/50" />
              <Bar className={w} />
            </li>
          ))}
        </ul>
      </div>

      <div
        className="flex items-center gap-2.5 rounded-xl border border-[#1A8C62]/30 bg-white px-3.5 py-2.5 shadow-sm transition-opacity duration-700 motion-reduce:transition-none"
        style={{ opacity: inView ? 1 : 0, ...anim(2850) }}
      >
        <Sparkles className="h-4 w-4 shrink-0 text-[#1A8C62]" />
        <span className="min-w-0 flex-1 truncate text-xs text-slate-400">
          Request a different cut: churn by segment, NRR by plan…
        </span>
        <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1A8C62]">
          <ArrowUp className="h-3.5 w-3.5 text-white" />
        </span>
      </div>

      <div
        className="flex items-center gap-1.5 transition-opacity duration-700 motion-reduce:transition-none"
        style={{ opacity: inView ? 1 : 0, ...anim(3150) }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#1A8C62]" />
        <span className="text-xs text-slate-500">
          Connected 12 sources · no analyst hours spent
        </span>
      </div>
    </div>
  );
}
