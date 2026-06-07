import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';
import { Logo } from '../Logo';

const NAV_LINKS = ['Product'];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center">
          <Logo variant="full" />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#features"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link}
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </a>
          ))}
          <a
              key="Customers"
              href="#customers"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Customers
            </a>
          <a
              key="Integrations"
              href="#integrations"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Integrations
            </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button asChild className="vf-cta-gradient h-9 px-4 text-white">
            <a href="#cta">Get Started</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
