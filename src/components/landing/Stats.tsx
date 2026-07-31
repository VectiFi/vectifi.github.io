import { useEffect, useState } from 'react';
import { ArrowDown, Check, Inbox, Sparkles } from 'lucide-react';
import { useInView } from './useInView';

const BULLETS = [
  'Ask the AI in plain English, straight from a chat',
  'Answers in seconds, not sprints, with the chart and the why',
  'No tickets, no queue, no waiting on the data team',
];

const QUESTION = '“What’s our retention rate by geo over the last 4 quarters?”';

// Character-by-character typing (the question wraps to two lines, so the
// clip-path wipe used in DashboardFigure would reveal both lines at once).
function useTypewriter(text: string, active: boolean, speedMs = 25) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(text.length);
      return;
    }
    setCount(0);
    // Updater stays pure (no clearInterval inside); completed ticks are no-ops
    // that bail out of re-rendering, and cleanup clears the interval.
    const id = setInterval(() => {
      setCount((c) => Math.min(c + 1, text.length));
    }, speedMs);
    return () => clearInterval(id);
  }, [active, text, speedMs]);

  return text.slice(0, count);
}

const TICKET_META = [
  { label: 'Requested by', value: 'You' },
  { label: 'Assigned to', value: 'Data team' },
  { label: 'Position', value: '#10 in queue' },
  { label: 'ETA', value: 'Next sprint' },
];

const QUEUE_BACKLOG = [
  { id: 'REQ-1041', title: 'Churn breakdown by segment', filed: 'Filed 3 days ago' },
  { id: 'REQ-1037', title: 'Budget vs. actuals refresh', filed: 'Filed last week' },
];

const ANSWER_ROWS = [
  { label: 'North America', value: '94.2%', delta: '+1.2', up: true, width: '94%' },
  { label: 'EMEA', value: '91.6%', delta: '+1.8', up: true, width: '87%' },
  { label: 'APAC', value: '88.4%', delta: '−0.6', up: false, width: '79%' },
  { label: 'LATAM', value: '85.1%', delta: '+0.4', up: true, width: '71%' },
];

// Carries id="customers" for the footer's Customers link — it moved here when
// the logo cloud section was removed.
export function Stats() {
  const [answerRef, answerInView] = useInView<HTMLDivElement>();

  // Same reset rule as DashboardFigure: staggered delays on entry, instant
  // snap to hidden while fully off-screen so the replay always starts clean.
  const anim = (delayMs: number) =>
    answerInView
      ? { transitionDelay: `${delayMs}ms` }
      : { transitionDelay: '0ms', transitionDuration: '0s' };

  const typedQuestion = useTypewriter(QUESTION, answerInView);

  return (
    <section id="customers" className="vf-section bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wide vf-text-blue">
              Chat with your data
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight vf-text-navy sm:text-4xl">
              While they wait in the queue, you get the answer{' '}
              <span className="vf-gradient-text-light">instantly</span>.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Other decision makers file a data request and wait their turn. You ask
              VectiFi's AI in chat and the answer comes back in seconds, complete with the
              chart and the why.
            </p>
            <ul className="mt-6 space-y-3">
              {BULLETS.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-3.5 w-3.5 vf-text-blue" />
                  </span>
                  <span className="text-base text-foreground">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto w-full min-w-0 max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              The old way
            </p>
            <div className="mt-3 rounded-2xl border border-border/60 bg-slate-50 p-6">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                <Inbox className="h-4 w-4" />
                Data request queue
              </p>
              <div className="mt-4 rounded-xl border border-border/60 border-l-4 border-l-amber-400 bg-white/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-semibold text-amber-600">REQ-1042</span>
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                    Queued
                  </span>
                </div>
                <p className="mt-2 text-base font-semibold text-slate-700">
                  Retention rate by geo, last 4 quarters
                </p>
                <dl className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
                  {TICKET_META.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-3">
                      <dt className="text-xs text-slate-400">{row.label}</dt>
                      <dd className="text-xs font-medium text-slate-600">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <ul className="mt-4 space-y-2.5">
                {QUEUE_BACKLOG.map((ticket) => (
                  <li
                    key={ticket.id}
                    className="flex items-baseline justify-between gap-3 px-1 text-xs text-slate-400"
                  >
                    <span className="truncate">
                      <span className="font-mono">{ticket.id}</span>
                      <span className="mx-1.5">·</span>
                      {ticket.title}
                    </span>
                    <span className="shrink-0">{ticket.filed}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div aria-hidden="true" className="my-4 flex justify-center text-[#1A8C62]">
              <ArrowDown className="h-8 w-8" />
            </div>

            <p className="text-sm font-semibold uppercase tracking-wide vf-text-blue">
              With VectiFi
            </p>
            <div
              ref={answerRef}
              className="mt-3 rounded-2xl bg-white p-6 shadow-xl shadow-black/10 ring-1 ring-black/5"
            >
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#1A8C62]">
                <Sparkles className="h-4 w-4" />
                Ask VectiFi
              </p>
              <p className="relative mt-3 text-base font-medium vf-text-navy">
                {/* Sizing copy (visibility:hidden is already off the a11y tree),
                    an aria-hidden animated overlay, and the full question for AT. */}
                <span className="invisible">{QUESTION}</span>
                <span aria-hidden="true" className="absolute inset-0">
                  {typedQuestion}
                  {answerInView && typedQuestion.length < QUESTION.length && (
                    <span className="text-[#1A8C62]">▍</span>
                  )}
                </span>
                <span className="sr-only">{QUESTION}</span>
              </p>
              <div
                className="mt-4 space-y-3 border-t border-slate-100 pt-4 transition-opacity duration-600 motion-reduce:transition-none"
                style={{ opacity: answerInView ? 1 : 0, ...anim(1550) }}
              >
                {ANSWER_ROWS.map((row, i) => (
                  <div key={row.label} className="flex items-center gap-3">
                    <span className="w-24 shrink-0 text-xs text-slate-500">{row.label}</span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[#1A8C62] transition-[width] duration-1000 ease-out motion-reduce:transition-none"
                        style={{
                          width: answerInView ? row.width : '0%',
                          ...anim(1750 + i * 150),
                        }}
                      />
                    </div>
                    <span className="w-11 shrink-0 text-right text-xs font-semibold vf-text-navy">
                      {row.value}
                    </span>
                    <span
                      className={`w-9 shrink-0 text-right text-[11px] font-medium transition-opacity duration-1000 motion-reduce:transition-none ${
                        row.up ? 'text-[#1A8C62]' : 'text-rose-500'
                      }`}
                      style={{
                        opacity: answerInView ? 1 : 0,
                        ...anim(2350 + i * 150),
                      }}
                    >
                      {row.delta}
                    </span>
                  </div>
                ))}
              </div>
              <p
                className="mt-4 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-600 transition-opacity duration-700 motion-reduce:transition-none"
                style={{ opacity: answerInView ? 1 : 0, ...anim(2950) }}
              >
                EMEA is up <span className="font-semibold">1.8 pts</span> since the Q1 pricing
                change; APAC is the only region trending down.
              </p>
              <div
                className="mt-3 flex items-center gap-1.5 transition-opacity duration-700 motion-reduce:transition-none"
                style={{ opacity: answerInView ? 1 : 0, ...anim(3300) }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#1A8C62]" />
                <span className="text-xs text-slate-500">Answered in 4 seconds · 3 sources</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
