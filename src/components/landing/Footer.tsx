import { Logo } from '../Logo';

const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: ['Dashboards', 'AI Insights', 'Integrations', 'Pricing'],
  },
  {
    title: 'Company',
    links: ['About', 'Customers', 'Careers', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Blog', 'Security', 'Status'],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container mx-auto px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="full" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The AI-native financial analytics platform that turns raw data into
              interactive dashboards and shareable insights.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold vf-text-navy">{column.title}</h4>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">© 2026 VectiFi. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#top" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#top" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
