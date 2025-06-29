
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Trade <span className="gradient-text">Smart</span>
              <br />
              Risk <span className="text-accent">Nothing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master cryptocurrency trading with $10,000 virtual funds. 
              Track 50+ cryptocurrencies in real-time with professional-grade tools.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4 crypto-glow">
              Start Trading Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-primary/50 hover:bg-primary/10">
              View Portfolio
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card className="glass-card p-6 animate-float">
              <div className="text-3xl font-bold text-accent mb-2">$10,000</div>
              <div className="text-muted-foreground">Virtual Trading Balance</div>
            </Card>
            
            <Card className="glass-card p-6 animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Cryptocurrencies Available</div>
            </Card>
            
            <Card className="glass-card p-6 animate-float" style={{ animationDelay: '2s' }}>
              <div className="text-3xl font-bold gradient-text mb-2">Real-Time</div>
              <div className="text-muted-foreground">Market Data & Analysis</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
