/** Recessive 2px trend line for the stat tiles. */
export function Sparkline({ points }: { points: number[] }) {
  // Below two points there is no line to draw, and the scaling maths would
  // produce NaN (i / 0) or -Infinity (Math.max of an empty array).
  if (points.length < 2) return null;

  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const path = points
    .map((p, i) => `${(i / (points.length - 1)) * 100},${22 - ((p - min) / span) * 18}`)
    .join(' ');

  return (
    <svg
      viewBox="0 0 100 24"
      preserveAspectRatio="none"
      fill="none"
      className="h-5 w-full text-[#1A8C62]"
    >
      <polyline
        points={path}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
