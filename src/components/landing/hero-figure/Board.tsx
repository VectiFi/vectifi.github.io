import { Sparkline } from './Sparkline';

const STATS = [
  { label: 'Revenue', value: '$5.5M', delta: '+12.4%', spark: [8, 11, 9, 14, 13, 18, 22] },
  { label: 'Gross margin', value: '61.2%', delta: '+4.2 pts', spark: [10, 9, 12, 11, 15, 16, 19] },
  { label: 'Net retention', value: '118%', delta: '+6 pts', spark: [12, 13, 12, 15, 17, 16, 20] },
];

/**
 * Single series, single hue — the card title names it, so no legend. `value` is
 * the bar height as a percentage; `display` is the direct label, kept on the
 * datum so it can never drift onto the wrong bar. The six scale to the $5.5M
 * Revenue tile above.
 */
const CHANNELS = [
  { label: 'Direct', value: 58, display: '$0.9M' },
  { label: 'Partner', value: 92, display: '$1.4M' },
  { label: 'Self-serve', value: 46, display: '$0.7M' },
  { label: 'Marketplace', value: 71, display: '$1.1M' },
  { label: 'Field', value: 39, display: '$0.6M' },
  { label: 'Referral', value: 54, display: '$0.8M' },
];

const PEAK = CHANNELS.reduce((a, b) => (b.value > a.value ? b : a));

export function Board() {
  return (
    <div className="min-w-0 flex-1 space-y-3 bg-slate-50/40 p-3.5 sm:p-4">
      <div className="flex items-baseline justify-between">
        <p className="text-[13px] font-semibold text-[#0B3D22]">Revenue review</p>
        <p className="text-[9px] text-slate-400">Updated 2m ago</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {STATS.map(({ label, value, delta, spark }) => (
          <div key={label} className="rounded-xl bg-white p-2.5 ring-1 ring-slate-900/5">
            <p className="truncate text-[9px] text-slate-500">{label}</p>
            <p className="mt-0.5 text-[15px] font-semibold leading-none tracking-tight text-[#0B3D22]">
              {value}
            </p>
            <p className="mt-1 text-[9px] font-medium text-[#1A8C62]">{delta}</p>
            <div className="mt-1.5">
              <Sparkline points={spark} />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white p-3 ring-1 ring-slate-900/5">
        <p className="text-[10px] font-semibold text-[#0B3D22]">Revenue by channel</p>
        <p className="text-[9px] text-slate-400">Last 6 months</p>

        <div className="relative mt-3 h-[104px]">
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3].map((line) => (
              <div key={line} className="border-t border-dashed border-slate-200/90" />
            ))}
          </div>

          <div className="relative flex h-full items-end gap-1.5">
            {CHANNELS.map(({ label, value }) => (
              <div key={label} className="flex h-full flex-1 flex-col justify-end">
                {label === PEAK.label && (
                  <span className="mb-1 text-center text-[9px] font-semibold text-[#0B3D22]">
                    {PEAK.display}
                  </span>
                )}
                <div
                  className="w-full rounded-t-[4px] bg-[#1A8C62]"
                  style={{ height: `${value}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-1.5 flex gap-1.5">
          {CHANNELS.map(({ label }) => (
            <span key={label} className="flex-1 truncate text-center text-[8px] text-slate-500">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
