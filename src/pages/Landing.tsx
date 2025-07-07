import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PC</span>
              </div>
              <h1 className="text-2xl font-bold gradient-text">PaperCoins</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold gradient-text">
                Master Crypto Trading
                <br />
                <span className="text-foreground">Risk-Free</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Practice cryptocurrency trading with virtual funds. Learn strategies, 
                test your skills, and build confidence before trading with real money.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup">
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Trading Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Already have an account?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose PaperCoins?</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to become a successful crypto trader
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Real Market Data</h3>
              <p className="text-muted-foreground">
                Trade with real-time cryptocurrency prices and market data. 
                Experience the same market conditions as real trading.
              </p>
            </Card>
            
            <Card className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Risk-Free Learning</h3>
              <p className="text-muted-foreground">
                Practice with virtual funds and learn from your mistakes 
                without losing real money. Perfect for beginners and experts alike.
              </p>
            </Card>
            
            <Card className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Advanced Analytics</h3>
              <p className="text-muted-foreground">
                Track your performance with detailed analytics, 
                portfolio insights, and trading history to improve your strategy.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">Ready to Start Your Trading Journey?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of traders who are mastering cryptocurrency trading with PaperCoins
            </p>
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8 py-6">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
              Built with Flask • PostgreSQL • Docker • 2025
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 