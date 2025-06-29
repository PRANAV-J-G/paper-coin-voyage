
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const Trading = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Trading</h1>
            <p className="text-muted-foreground">Execute trades with real-time market data</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-4">Buy/Sell Orders</h2>
              <div className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  Trading interface coming soon...
                </div>
                <Button className="w-full">
                  Place Order
                </Button>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-4">Market Data</h2>
              <div className="text-center py-8 text-muted-foreground">
                Real-time cryptocurrency prices and charts will be displayed here.
              </div>
            </Card>
          </div>

          <Card className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-4">Order Book</h2>
            <div className="text-center py-8 text-muted-foreground">
              Live order book data will be shown here.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Trading;
