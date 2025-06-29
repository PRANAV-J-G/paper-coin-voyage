
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TradingDashboard from '@/components/TradingDashboard';
import Features from '@/components/Features';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <TradingDashboard />
      <Features />
      
      {/* Footer */}
      <footer className="border-t border-border/20 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PC</span>
              </div>
              <h3 className="text-2xl font-bold gradient-text">PaperCoins</h3>
            </div>
            <p className="text-muted-foreground">
              Trade Smart. Risk Nothing. Master crypto trading with virtual funds.
            </p>
            <div className="text-sm text-muted-foreground">
              Built with Flask • PostgreSQL • Docker • March 2025
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
