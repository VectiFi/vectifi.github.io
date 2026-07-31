import { ArrowUp, Sparkles } from 'lucide-react';
import { useInView } from './useInView';

const KPIS = [
  { label: 'Revenue', value: '$4.2M', delta: '+8.1% QoQ' },
  { label: 'Retention', value: '91.6%', delta: '+1.2 pts' },
  { label: 'NRR', value: '108%', delta: '+2.0 pts' },
];

const REGION_BARS = [
  { label: 'NA', value: '$1.8M', height: '100%' },
  { label: 'EMEA', value: '$1.2M', height: '72%' },
  { label: 'APAC', value: '$0.8M', height: '48%' },
  { label: 'LATAM', value: '$0.4M', height: '28%' },
];

// Mirrors the ticket-queue section's answer card so the page tells one story.
const REGION_ROWS = [
  { region: 'North America', revenue: '$1.8M', retention: '94.2%', delta: '+1.2', up: true },
  { region: 'EMEA', revenue: '$1.2M', retention: '91.6%', delta: '+1.8', up: true },
  { region: 'APAC', revenue: '$0.8M', retention: '88.4%', delta: '−0.6', up: false },
  { region: 'LATAM', revenue: '$0.4M', retention: '85.1%', delta: '+0.4', up: true },
];

const TREND_POINTS: Array<[number, number]> = [
  [6, 74],
  [23, 68],
  [40, 70],
  [57, 62],
  [74, 66],
  [91, 58],
  [108, 60],
  [125, 50],
  [142, 53],
  [159, 42],
  [176, 34],
  [194, 24],
];

/**
 * The dashboards-feature figure: a plain-English prompt typing itself out, then
 * the dashboard it produced assembling panel by panel. Markup instead of an SVG
 * file so it renders in the site's fonts — same reasoning as HeroFigure.
 */
export function DashboardFigure() {
  const trendLine = TREND_POINTS.map(([x, y]) => `${x},${y}`).join(' ');
  const [figureRef, inView] = useInView<HTMLDivElement>(0.2);

  // Entry keeps the storytelling stagger; exit happens fully off-screen, so it
  // snaps (zero delay, zero duration) — otherwise a quick scroll up and back
  // returns before the delayed reverse transitions ever ran, and only the
  // prompt text (delay 0) replays.
  const anim = (delayMs: number) =>
    inView
      ? { transitionDelay: `${delayMs}ms` }
      : { transitionDelay: '0ms', transitionDuration: '0s' };

  return (
    <div
      ref={figureRef}
      role="img"
      aria-label="Illustration of the VectiFi dashboard builder: a typed request for revenue by region, monthly trend, and retention, and the finished dashboard it produced with KPI tiles, charts, and a region table. All figures are invented."
      className="flex flex-col gap-3.5 rounded-2xl border border-border/60 bg-white p-5 shadow-xl shadow-green-900/10 sm:p-6"
    >
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
          Show revenue by region, monthly trend, and retention
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

      <div
        className="flex flex-wrap items-center gap-2 transition-opacity duration-700 motion-reduce:transition-none"
        style={{ opacity: inView ? 1 : 0, ...anim(1500) }}
      >
        <span className="rounded-full border border-border/60 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
          Last 12 months
        </span>
        <span className="rounded-full border border-border/60 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
          All regions
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1A8C62]" />
          Live
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {KPIS.map((kpi, i) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-border/60 bg-slate-50/60 p-3 transition-[opacity,transform] duration-900 ease-out motion-reduce:transition-none"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(8px)',
              ...anim(1600 + i * 140),
            }}
          >
            <p className="text-xs text-slate-500">{kpi.label}</p>
            <p className="mt-1 text-lg font-bold vf-text-navy sm:text-xl">{kpi.value}</p>
            <p className="mt-0.5 truncate text-[11px] font-medium text-[#1A8C62]">{kpi.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid flex-1 grid-cols-2 gap-3">
        <div
          className="flex flex-col rounded-xl border border-border/60 bg-slate-50/60 p-3 transition-[opacity,transform] duration-600 ease-out motion-reduce:transition-none"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(8px)',
            ...anim(1650),
          }}
        >
          <p className="text-xs text-slate-500">Revenue by region</p>
          <div className="mt-3 flex min-h-24 flex-1 items-end justify-around gap-2">
            {REGION_BARS.map((bar, i) => (
              <div key={bar.label} className="flex h-full w-full max-w-9 flex-col justify-end gap-1">
                <p
                  className="text-center text-[9px] font-semibold vf-text-navy transition-opacity duration-800 motion-reduce:transition-none"
                  style={{ opacity: inView ? 1 : 0, ...anim(2550 + i * 150) }}
                >
                  {bar.value}
                </p>
                <div
                  className="w-full origin-bottom rounded-t bg-gradient-to-t from-[#7DC4A0] to-[#0B4A30] transition-transform duration-1000 ease-out motion-reduce:transition-none"
                  style={{
                    height: bar.height,
                    transform: inView ? 'scaleY(1)' : 'scaleY(0)',
                    ...anim(1950 + i * 150),
                  }}
                />
                <p className="text-center text-[9px] text-slate-400">{bar.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          className="flex flex-col rounded-xl border border-border/60 bg-slate-50/60 p-3 transition-[opacity,transform] duration-600 ease-out motion-reduce:transition-none"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(8px)',
            ...anim(1750),
          }}
        >
          <p className="text-xs text-slate-500">Monthly trend</p>
          <svg
            viewBox="0 0 200 90"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="mt-2 min-h-20 w-full flex-1"
          >
            <polygon
              points={`${trendLine} 194,88 6,88`}
              fill="#1A8C62"
              fillOpacity="0.1"
              className="transition-opacity duration-1000 motion-reduce:transition-none"
              style={{ opacity: inView ? 1 : 0, ...anim(3200) }}
            />
            <polyline
              points={trendLine}
              fill="none"
              stroke="#1A8C62"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={100}
              strokeDasharray="100"
              className="transition-[stroke-dashoffset] duration-1500 ease-out motion-reduce:transition-none"
              style={{ strokeDashoffset: inView ? 0 : 100, ...anim(2150) }}
            />
            <circle
              cx="194"
              cy="24"
              r="3.5"
              fill="#0B4A30"
              className="transition-opacity duration-500 motion-reduce:transition-none"
              style={{ opacity: inView ? 1 : 0, ...anim(3600) }}
            />
          </svg>
          <div className="mt-1 flex justify-between text-[9px] text-slate-400">
            <span>Aug</span>
            <span>Nov</span>
            <span>Feb</span>
            <span>Jun</span>
          </div>
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
        <div className="grid grid-cols-[1.4fr_1fr_1fr_0.7fr] gap-2 border-b border-border/60 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          <span>Region</span>
          <span className="text-right">Revenue</span>
          <span className="text-right">Retention</span>
          <span className="text-right">QoQ</span>
        </div>
        <div className="mt-1.5 space-y-1.5">
          {REGION_ROWS.map((row, i) => (
            <div
              key={row.region}
              className="grid grid-cols-[1.4fr_1fr_1fr_0.7fr] gap-2 text-xs transition-opacity duration-900 motion-reduce:transition-none"
              style={{ opacity: inView ? 1 : 0, ...anim(2400 + i * 130) }}
            >
              <span className="truncate text-slate-600">{row.region}</span>
              <span className="text-right font-medium vf-text-navy">{row.revenue}</span>
              <span className="text-right font-medium vf-text-navy">{row.retention}</span>
              <span
                className={`text-right font-medium ${row.up ? 'text-[#1A8C62]' : 'text-rose-500'}`}
              >
                {row.delta}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex items-center gap-1.5 transition-opacity duration-700 motion-reduce:transition-none"
        style={{ opacity: inView ? 1 : 0, ...anim(2800) }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#1A8C62]" />
        <span className="text-xs text-slate-500">
          Built in seconds · no ticket filed · updates itself
        </span>
      </div>
    </div>
  );
}
