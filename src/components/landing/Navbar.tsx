import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';
import { Logo } from '../Logo';
import { cn } from '../ui/utils';

const NAV_LINKS = [
  { label: 'Product', href: '#features', caret: true },
  { label: 'Customers', href: '#customers' },
  { label: 'Integrations', href: '#integrations' },
];

// Distance in px before the header swaps from transparent-on-hero to solid white.
const SCROLL_THRESHOLD = 16;

export function Navbar() {
  // Seeded from the real scroll position: loading mid-page must paint the solid
  // header on the first frame, or the light-on-dark styling flashes over the
  // white sections while the colour transition catches up.
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > SCROLL_THRESHOLD,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full border-b transition-colors duration-300',
        scrolled
          ? 'border-border/60 bg-white shadow-sm shadow-green-900/5'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 md:h-20">
        <a href="#top" className="relative flex items-center" aria-label="VectiFi home">
          <Logo
            variant="onDark"
            decorative
            className={cn(
              'h-10 w-auto transition-opacity duration-300 md:h-12',
              scrolled && 'opacity-0',
            )}
          />
          <Logo
            variant="full"
            decorative
            className={cn(
              'absolute left-0 top-0 h-10 w-auto transition-opacity duration-300 md:h-12',
              scrolled ? 'opacity-100' : 'opacity-0',
            )}
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href, caret }) => (
            <a
              key={label}
              href={href}
              className={cn(
                // transition-[color] rather than transition-colors: the latter also
                // animates outline-color, which fades the focus ring in over 300ms.
                'flex items-center gap-1 rounded-sm text-base font-medium transition-[color]',
                'focus-visible:outline-2 focus-visible:outline-offset-4',
                scrolled
                  ? 'text-muted-foreground hover:text-foreground focus-visible:outline-[var(--vf-teal)]'
                  : 'text-white/80 hover:text-white focus-visible:outline-white',
              )}
            >
              {label}
              {caret && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
            </a>
          ))}
        </nav>

        <Button
          asChild
          className={cn(
            'h-10 rounded-full px-5 text-sm font-semibold transition-colors md:h-11 md:px-6 md:text-base',
            'focus-visible:ring-offset-2',
            scrolled
              ? 'vf-cta-gradient text-white focus-visible:ring-[var(--vf-teal)] focus-visible:ring-offset-white'
              : 'vf-cta-light focus-visible:ring-white focus-visible:ring-offset-transparent',
          )}
        >
          <a href="#cta">Get Started</a>
        </Button>
      </div>
    </header>
  );
}
