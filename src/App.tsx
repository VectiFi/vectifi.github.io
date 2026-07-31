import { Navbar } from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import { Stats } from './components/landing/Stats';
import { Features } from './components/landing/Features';
import { Integrations } from './components/landing/Integrations';
import { CTA } from './components/landing/CTA';
import { Footer } from './components/landing/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Integrations />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
