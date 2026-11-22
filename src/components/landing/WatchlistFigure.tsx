import { ArrowUp, Bell, Mail, Sparkles } from 'lucide-react';
import { useInView } from './useInView';

// The rule the typed sentence becomes. Recipient and schedule are part of the
// sentence, so they show up as fields, not settings.
const RULE_FIELDS = [
  { label: 'Watching', value: 'Clients whose monthly billing fell 20% or more vs. prior month' },
  { label: 'Fires when', value: 'A client newly appears on that list' },
  { label: 'Tells', value: 'Dana R. · by email, the morning it happens' },
];

// Two invented clinics; the drops are the matching records the agent attaches.
const MATCHES = [
  { client: 'Riverbend Clinic', from: '$42K', to: '$29K', drop: '−31%' },
  { client: 'Northgate Medical', from: '$58K', to: '$44K', drop: '−24%' },
];

/**
 * Section 5 figure (Watchlist): a plain-English alert typing itself out, the
 * rule the agent turned it into, and the churn-warning email it sent when the
 * rule fired. Markup instead of an SVG file so it renders in the site's fonts.
 */
export function WatchlistFigure() {
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
      aria-label="Illustration of the VectiFi watchlist: a typed sentence asking to alert a colleague when any client's monthly billing drops twenty percent or more, the rule the agent created from it, and the churn-warning email it sent with the two matching clients. All names and figures are invented."
      className="flex flex-col gap-3.5 rounded-2xl border border-border/60 bg-white p-5 shadow-xl shadow-green-900/10 sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#1A8C62]">
          <Bell className="h-4 w-4" />
          Watchlist
        </p>
        <span className="shrink-0 text-[11px] font-medium text-slate-400">
          Checks daily after sync
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
          Alert Dana if any client's monthly billing drops 20%+
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
        className="rounded-xl border border-border/60 bg-slate-50/60 p-3 transition-[opacity,transform] duration-600 ease-out motion-reduce:transition-none"
        style={rise(1550)}
      >
        <p className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          <span>Rule created</span>
          <span className="flex items-center gap-1.5 font-medium normal-case tracking-normal text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1A8C62]" />
            Watching
          </span>
        </p>
        <dl className="mt-2.5 space-y-2">
          {RULE_FIELDS.map((field, i) => (
            <div
              key={field.label}
              className="grid grid-cols-[4.5rem_1fr] gap-2 text-xs transition-opacity duration-800 motion-reduce:transition-none"
              style={{ opacity: inView ? 1 : 0, ...anim(1750 + i * 160) }}
            >
              <dt className="text-slate-400">{field.label}</dt>
              <dd className="min-w-0 text-slate-600">{field.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        className="rounded-xl border border-[#1A8C62]/20 bg-[#1A8C62]/5 p-3.5 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none"
        style={rise(2500)}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[#1A8C62]">
            <Mail className="h-3.5 w-3.5" />
            Churn warning · 2 clients
          </p>
          <span className="shrink-0 text-[11px] font-medium text-slate-400">
            To Dana · Tue 8:04 AM
          </span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">
          Two clients crossed your 20% threshold in last night's data. Records
          attached.
        </p>
        <div className="mt-2.5 rounded-lg border border-border/60 bg-white p-2.5">
          <div className="grid grid-cols-[1.8fr_0.7fr_0.8fr_0.6fr] gap-2 border-b border-border/60 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            <span>Client</span>
            <span className="text-right">Prior</span>
            <span className="text-right">This month</span>
            <span className="text-right">Drop</span>
          </div>
          <div className="mt-1.5 space-y-1.5">
            {MATCHES.map((row, i) => (
              <div
                key={row.client}
                className="grid grid-cols-[1.8fr_0.7fr_0.8fr_0.6fr] gap-2 text-xs transition-opacity duration-900 motion-reduce:transition-none"
                style={{ opacity: inView ? 1 : 0, ...anim(2800 + i * 160) }}
              >
                <span className="truncate text-slate-600">{row.client}</span>
                <span className="text-right text-slate-500">{row.from}</span>
                <span className="text-right font-medium vf-text-navy">{row.to}</span>
                <span className="text-right font-medium text-rose-500">{row.drop}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          className="mt-2.5 flex flex-wrap items-center gap-2 transition-opacity duration-700 motion-reduce:transition-none"
          style={{ opacity: inView ? 1 : 0, ...anim(3200) }}
        >
          <span className="rounded-full bg-[#1A8C62] px-2.5 py-0.5 text-[11px] font-medium text-white">
            Open in VectiFi
          </span>
          <span className="rounded-full border border-border/60 bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
            Ask a follow-up
          </span>
        </div>
      </div>

      <div
        className="flex items-center gap-1.5 transition-opacity duration-700 motion-reduce:transition-none"
        style={{ opacity: inView ? 1 : 0, ...anim(3500) }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#1A8C62]" />
        <span className="text-xs text-slate-500">
          6 rules watching · weekly digest Mondays · no dashboard to check
        </span>
      </div>
    </div>
  );
}
