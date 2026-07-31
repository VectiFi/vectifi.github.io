import { LayoutGrid, MessageSquare, PieChart, Plug } from 'lucide-react';
import { Logo } from '../../Logo';
import { Board } from './Board';

const NAV = [
  { icon: LayoutGrid, label: 'Dashboards', active: true },
  { icon: MessageSquare, label: 'Ask AI' },
  { icon: PieChart, label: 'Reports' },
  { icon: Plug, label: 'Integrations' },
];

export function AppWindow() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/40 ring-1 ring-white/15">
      {/*
        The sync pill sits left, not right: at lg the InsightCard overlaps the
        top-right corner, and anything anchored there is hidden behind it.
      */}
      <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-4 py-2.5">
        <Logo variant="icon" className="h-5 w-5" decorative />
        <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-1 text-[9px] font-medium text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1A8C62]" />
          12 sources synced
        </span>
        {/* Tucks beside the pill from sm up — that is exactly where InsightCard
            appears, and the top-right corner it would otherwise sit in is
            completely hidden behind it. */}
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#0B4A30] text-[8px] font-semibold text-white sm:ml-0">
          AR
        </span>
      </div>

      <div className="flex">
        <div className="hidden w-[132px] shrink-0 border-r border-slate-100 bg-slate-50/70 p-3 sm:block">
          {NAV.map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={`mb-0.5 flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] font-medium ${
                active ? 'bg-white text-[#0B3D22] shadow-sm' : 'text-slate-400'
              }`}
            >
              <Icon className={`h-3 w-3 ${active ? 'text-[#1A8C62]' : ''}`} />
              {label}
            </div>
          ))}

          <div className="mt-4 border-t border-slate-200/80 pt-3">
            <p className="px-2 text-[8px] font-semibold uppercase tracking-wide text-slate-400">
              Saved boards
            </p>
            {['Revenue review', 'Pipeline health'].map((board) => (
              <div key={board} className="px-2 py-1.5 text-[10px] text-slate-400">
                {board}
              </div>
            ))}
          </div>
        </div>

        <Board />
      </div>
    </div>
  );
}
