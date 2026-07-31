import { Logo } from '../Logo';

// href '#top' marks a destination that does not exist yet.
const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Dashboards', href: '#top' },
      { label: 'AI Insights', href: '#top' },
      { label: 'Integrations', href: '#integrations' },
      { label: 'Pricing', href: '#top' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#top' },
      { label: 'Customers', href: '#customers' },
      { label: 'Careers', href: '#top' },
      { label: 'Contact', href: '#cta' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#top' },
      { label: 'Privacy Policy', href: '/privacy/' },
      { label: 'Cookie Policy', href: '/cookies/' },
    ],
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
              The AI-native business analytics platform that turns raw data into
              interactive dashboards and shareable insights.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold vf-text-navy">{column.title}</h4>
              <ul className="mt-4 space-y-3">
                {column.links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground">© 2026 VectiFi, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
