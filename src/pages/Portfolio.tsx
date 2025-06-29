
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Portfolio</h1>
            <p className="text-muted-foreground">Track your cryptocurrency holdings and performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card p-6">
              <div className="text-2xl font-bold text-accent mb-2">$10,000.00</div>
              <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
            </Card>
            
            <Card className="glass-card p-6">
              <div className="text-2xl font-bold text-green-500 mb-2">+$0.00</div>
              <div className="text-sm text-muted-foreground">24h Change</div>
            </Card>
            
            <Card className="glass-card p-6">
              <div className="text-2xl font-bold gradient-text mb-2">0%</div>
              <div className="text-sm text-muted-foreground">Total Return</div>
            </Card>
          </div>

          <Card className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-4">Holdings</h2>
            <div className="text-center py-8 text-muted-foreground">
              No cryptocurrency holdings yet. Start trading to build your portfolio.
            </div>
          </Card>

          <Card className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-4">Performance Chart</h2>
            <div className="text-center py-8 text-muted-foreground">
              Portfolio performance chart will be displayed here once you start trading.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
