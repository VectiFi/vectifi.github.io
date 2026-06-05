import { ImageWithFallback } from '../figma/ImageWithFallback';

// Sourced from Merge.dev unified API categories: Accounting and CRM.
const ACCOUNTING = [
  'QuickBooks Online',
  'Xero',
  'NetSuite',
  'Sage Intacct',
  'FreshBooks',
  'FreeAgent',
  'Clear Books',
  'Microsoft Dynamics 365',
];

const CRM = [
  'Salesforce',
  'HubSpot',
  'Pipedrive',
  'Close',
  'Copper',
  'Insightly',
  'Affinity',
  'Capsule',
];

function IntegrationGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wide vf-text-blue">{title}</h4>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map((name) => (
          <div
            key={name}
            className="flex items-center gap-3 rounded-xl border border-border/60 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md"
          >
            <ImageWithFallback
              src={`/placeholder-integration-${name}.svg`}
              alt={`${name} logo`}
              className="h-8 w-8 flex-shrink-0 rounded-md"
            />
            <span className="truncate text-sm font-medium text-foreground">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Integrations() {
  return (
    <section id="integrations" className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight vf-text-navy sm:text-4xl">
            Connects to the tools your data already lives in.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Sync accounting and CRM data in a few clicks. VectiFi keeps every source in
            lockstep so your dashboards and insights are always current.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          <IntegrationGroup title="Accounting" items={ACCOUNTING} />
          <IntegrationGroup title="CRM" items={CRM} />
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          …and 200+ more across accounting, CRM, and beyond.
        </p>
      </div>
    </section>
  );
}
