import { Navbar } from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import { Stats } from './components/landing/Stats';
import { DashboardsFeature, InsightsFeature } from './components/landing/Features';
import { Integrations } from './components/landing/Integrations';
import { CTA } from './components/landing/CTA';
import { Footer } from './components/landing/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <DashboardsFeature />
        <Stats />
        <InsightsFeature />
        <Integrations />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
