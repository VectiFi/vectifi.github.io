import { useEffect, useRef, useState } from 'react';

/**
 * True while the element is in view. Turns true once `threshold` of it is
 * visible; resets to false when it has fully left the viewport OR when it has
 * only barely entered from below (top edge still in the lower half of the
 * viewport). The second rule matters for tall figures: after scrolling back to
 * the top of the page a ~1000px card can keep peeking into the viewport
 * forever, and a fully-out-only reset never fires, so the animation never
 * replays. Re-entry from above (scrolling up from a later section) does not
 * reset, so the animation never visibly rewinds mid-read.
 * With prefers-reduced-motion it reports true permanently so animated elements
 * render in their final state; pair every transition with motion-reduce:transition-none.
 */
export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        // Process every batched record in order — a fast flick can cross both
        // thresholds in one dispatch, and only the last record is current.
        for (const entry of entries) {
          const viewportH = entry.rootBounds?.height ?? window.innerHeight;
          if (entry.intersectionRatio >= threshold) {
            setInView(true);
          } else if (!entry.isIntersecting || entry.boundingClientRect.top > viewportH / 2) {
            setInView(false);
          }
        }
      },
      { threshold: [0, threshold] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}
