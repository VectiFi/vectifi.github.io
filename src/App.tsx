import { EmailForm } from './components/EmailForm';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Company Name - More Attractive */}
          <h1 className="text-6xl md:text-8xl tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent mb-6">
            VectiFi
          </h1>

          {/* Slogan - Below Logo, No Background */}
          <p className="text-sm text-muted-foreground uppercase mb-16">The best analyst on your team</p>

          {/* Main Headline - Smaller */}
          <p className="text-2xl md:text-3xl text-muted-foreground max-w-5xl mx-auto whitespace-nowrap px-4 mb-16">
            AI-native FP&A platform empowering smarter business decisions
          </p>

          {/* Launch Status */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <p className="text-sm uppercase">Product launching soon</p>
          </div>
        </div>
      </section>

      {/* Email Collection Section - Deep Dark Blue Background */}
      <section className="bg-[#001a3d] py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-white text-center text-lg md:text-xl font-bold">
              Learn More and A Change to Join Exclusive Beta Launch
            </h2>
            <div>
              <EmailForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 VectiFi. All rights reserved.</p>
            <p className="text-sm text-muted-foreground">
              Empowering finance teams with AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
