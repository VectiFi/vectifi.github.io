import { ArrowUp, Sparkles } from 'lucide-react';
import { useInView } from './useInView';

// Modelled on the app's Financial Planning page: chart-of-accounts rows with
// forecast, actual, and variance columns, variance shown as amount over
// percent, negatives in parentheses. Same payer story as the other figures
// ($4.2M quarter: Medicare 1.6, Commercial 1.4, Medicaid 0.8, Self-pay 0.4);
// January is roughly a third of each, and Commercial misses because of the
// denials thread from the report figure. Account codes and names are invented.
const TABS = ['Actuals', 'Forecast', 'Compare'] as const;
const ACTIVE_TAB: (typeof TABS)[number] = 'Forecast';

const ROWS: Array<{
  account: string;
  forecast: string;
  actual: string;
  variance: string;
  pct: string;
  tone: 'up' | 'down' | 'flag';
}> = [
  { account: '4110 · Medicare', forecast: '$540K', actual: '$552K', variance: '$12K', pct: '+2.2%', tone: 'up' },
  { account: '4120 · Commercial', forecast: '$470K', actual: '$449K', variance: '($21K)', pct: '−4.5%', tone: 'flag' },
  { account: '4130 · Medicaid', forecast: '$265K', actual: '$262K', variance: '($3K)', pct: '−1.1%', tone: 'down' },
  { account: '4140 · Self-pay', forecast: '$135K', actual: '$138K', variance: '$3K', pct: '+2.2%', tone: 'up' },
];

const TOTAL = { account: 'Net collections', forecast: '$1.41M', actual: '$1.40M', variance: '($9K)', pct: '−0.6%' };

const TONE: Record<(typeof ROWS)[number]['tone'], string> = {
  up: 'text-[#1A8C62]',
  down: 'text-slate-500',
  flag: 'text-rose-500',
};

const GRID = 'grid-cols-[1.9fr_0.75fr_0.75fr_0.9fr]';

/**
 * Section 4 figure (Planning): the Financial Planning page with the Forecast
 * tab active. A plain-English forecast request types itself out, the
 * forecast-versus-actual table fills in by account, and the variance
 * commentary the analyst wrote at close sits in a panel to the right of the
 * table. Markup instead of an SVG file so it renders in the site's fonts.
 */
export function PlanningFigure() {
  const [figureRef, inView] = useInView<HTMLDivElement>(0.2);

  // Entry keeps the stagger; exit snaps while fully off-screen (same reset
  // rule as DashboardFigure) so the replay always starts clean.
  const anim = (delayMs: number) =>
    inView
      ? { transitionDelay: `${delayMs}ms` }
      : { transitionDelay: '0ms', transitionDuration: '0s' };

  const rise = (delayMs: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : 'translateY(8px)',
    ...anim(delayMs),
  });

  return (
    <div
      ref={figureRef}
      role="img"
      aria-label="Illustration of VectiFi financial planning on the Forecast tab: a typed request to forecast first-quarter collections by payer, a chart-of-accounts table with forecast, January actual, and variance columns where Commercial is flagged, and the AI's plain-language variance commentary in a panel beside the table. All figures are invented."
      className="flex flex-col gap-3.5 rounded-2xl border border-border/60 bg-white p-5 shadow-xl shadow-green-900/10 sm:p-6"
    >
      <div className="flex items-end justify-between gap-3 border-b border-border/60">
        <div className="min-w-0">
          <p className="text-sm font-semibold vf-text-navy">Financial Planning</p>
          <div className="mt-2 flex gap-4">
            {TABS.map((tab) => {
              const active = tab === ACTIVE_TAB;
              return (
                <span
                  key={tab}
                  className={`-mb-px border-b-2 pb-1.5 text-[11px] font-medium ${
                    active
                      ? 'border-[#1A8C62] text-[#1A8C62]'
                      : 'border-transparent text-slate-400'
                  }`}
                >
                  {tab}
                </span>
              );
            })}
          </div>
        </div>
        <span className="shrink-0 pb-2 text-[11px] font-medium text-slate-400">
          Monthly · Q1 2027
        </span>
      </div>

      <div className="flex items-center gap-2.5 rounded-xl border border-[#1A8C62]/30 bg-white px-3.5 py-2.5 shadow-sm">
        <Sparkles className="h-4 w-4 shrink-0 text-[#1A8C62]" />
        <span
          className="min-w-0 flex-1 truncate text-sm font-medium vf-text-navy transition-[clip-path] duration-1400 motion-reduce:transition-none"
          style={{
            clipPath: inView ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
            transitionTimingFunction: 'steps(40, end)',
            ...anim(0),
          }}
        >
          Forecast Q1 collections by payer, flag variance over 3%
        </span>
        <span
          className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1A8C62] transition-[opacity,transform] duration-300 motion-reduce:transition-none"
          style={{
            opacity: inView ? 1 : 0.35,
            transform: inView ? 'scale(1)' : 'scale(0.85)',
            ...anim(1400),
          }}
        >
          <ArrowUp className="h-3.5 w-3.5 text-white" />
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-[1.9fr_1fr] lg:grid-cols-1 xl:grid-cols-[1.9fr_1fr]">
        <div
          className="flex min-w-0 flex-col rounded-xl border border-border/60 bg-slate-50/60 p-3 transition-[opacity,transform] duration-600 ease-out motion-reduce:transition-none"
          style={rise(1550)}
        >
          <div
            className={`grid ${GRID} gap-2 border-b border-border/60 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400`}
          >
            <span>Account</span>
            <span className="text-right">Forecast</span>
            <span className="text-right">Actual</span>
            <span className="text-right">Variance</span>
          </div>
          <p
            className="mt-2 text-[11px] font-semibold text-slate-500 transition-opacity duration-700 motion-reduce:transition-none"
            style={{ opacity: inView ? 1 : 0, ...anim(1800) }}
          >
            Revenue
          </p>
          <div className="mt-1 space-y-1.5">
            {ROWS.map((row, i) => (
              <div
                key={row.account}
                className={`grid ${GRID} items-baseline gap-2 border-b border-border/40 pb-1.5 text-[11px] transition-opacity duration-900 motion-reduce:transition-none`}
                style={{ opacity: inView ? 1 : 0, ...anim(1950 + i * 150) }}
              >
                <span className="truncate text-slate-600">{row.account}</span>
                <span className="text-right text-slate-500">{row.forecast}</span>
                <span className="text-right font-medium vf-text-navy">{row.actual}</span>
                <span className={`text-right font-medium leading-tight ${TONE[row.tone]}`}>
                  {row.variance}
                  <span className="block text-[9px] font-normal">({row.pct})</span>
                </span>
              </div>
            ))}
            <div
              className={`grid ${GRID} items-baseline gap-2 pt-0.5 text-[11px] font-semibold transition-opacity duration-900 motion-reduce:transition-none`}
              style={{ opacity: inView ? 1 : 0, ...anim(2600) }}
            >
              <span className="truncate vf-text-navy">{TOTAL.account}</span>
              <span className="text-right text-slate-500">{TOTAL.forecast}</span>
              <span className="text-right vf-text-navy">{TOTAL.actual}</span>
              <span className="text-right leading-tight text-rose-500">
                {TOTAL.variance}
                <span className="block text-[9px] font-normal">({TOTAL.pct})</span>
              </span>
            </div>
          </div>
          <div
            className="mt-auto flex flex-wrap gap-1.5 pt-3 transition-opacity duration-700 motion-reduce:transition-none"
            style={{ opacity: inView ? 1 : 0, ...anim(2750) }}
          >
            {['Basis: 6 mo. actuals', 'Driver: payer mix', 'Band: ±3%'].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-border/60 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-500"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div
          className="flex min-w-0 flex-col rounded-xl border border-[#1A8C62]/20 bg-[#1A8C62]/5 p-3.5 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none"
          style={rise(2900)}
        >
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[#1A8C62]">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            Commentary
          </p>
          <p className="mt-0.5 text-[10px] text-slate-400">Written at January close</p>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            January closed 0.6% under forecast. Commercial is the driver, 4.5%
            below plan as denials from your largest payer rose. Medicare ran
            ahead and covered most of the gap.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Q1 model refit on January actuals.
          </p>
          <span className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-rose-50 px-2 py-0.5 pt-2 text-[10px] font-medium text-rose-500">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            1 account outside the 3% band
          </span>
        </div>
      </div>

      <div
        className="flex items-center gap-1.5 transition-opacity duration-700 motion-reduce:transition-none"
        style={{ opacity: inView ? 1 : 0, ...anim(3300) }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#1A8C62]" />
        <span className="text-xs text-slate-500">
          Actuals pulled automatically · model refit each close · no spreadsheet maintained
        </span>
      </div>
    </div>
  );
}
