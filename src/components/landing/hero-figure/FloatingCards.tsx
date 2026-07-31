import { ArrowUp, MessageSquare, Sparkles } from 'lucide-react';

/**
 * The plain-language question that built the board.
 *
 * Only floats at lg, where there is room to sit left of the chart and clear the
 * first bar. Below that it stacks under the window in normal flow: overlaying it
 * on a narrow figure covered up to 4 of the 6 bars and their axis labels, which
 * read as a broken chart rather than a layered composition.
 */
export function AskCard() {
  return (
    <div className="static mt-4 w-full rounded-2xl bg-[#0B4A30] p-3 shadow-xl shadow-black/40 ring-1 ring-white/10 lg:absolute lg:-bottom-10 lg:-left-20 lg:mt-0 lg:w-[12.5rem] lg:p-2.5">
      <p className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wide text-[#7DC4A0]">
        <MessageSquare className="h-3 w-3" />
        Ask AI
      </p>
      <p className="mt-1.5 text-[11px] leading-snug text-white">
        Break revenue down by channel and show me what moved margin.
      </p>
      <div className="mt-2.5 flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1.5">
        <span className="text-[9px] text-white/60">Ask a follow-up…</span>
        <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-[#7DC4A0]">
          <ArrowUp className="h-2.5 w-2.5 text-[#0B4A30]" />
        </span>
      </div>
    </div>
  );
}

/** The answer it wrote back. Clears the title bar so the chrome stays readable. */
export function InsightCard() {
  return (
    <div className="absolute -right-6 -top-12 hidden w-[14rem] rounded-2xl bg-white p-3 shadow-xl shadow-black/30 ring-1 ring-black/5 sm:block lg:-right-4 xl:-right-10">
      <p className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wide text-[#1A8C62]">
        <Sparkles className="h-3 w-3" />
        Insight
      </p>
      <p className="mt-1.5 text-[11px] leading-snug text-[#0B3D22]">
        Partner mix grew 12 pts and carried most of the{' '}
        <span className="font-semibold">+4.2 pt</span> margin gain.
      </p>
      <div className="mt-2 flex items-center gap-1.5 border-t border-slate-100 pt-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#1A8C62]" />
        <span className="text-[9px] text-slate-500">High confidence · 3 sources</span>
      </div>
    </div>
  );
}
