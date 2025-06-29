
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your trading activity and performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card p-6">
              <div className="text-2xl font-bold text-accent mb-2">$10,000.00</div>
              <div className="text-sm text-muted-foreground">Virtual Balance</div>
            </Card>
            
            <Card className="glass-card p-6">
              <div className="text-2xl font-bold text-primary mb-2">$0.00</div>
              <div className="text-sm text-muted-foreground">Total P&L</div>
            </Card>
            
            <Card className="glass-card p-6">
              <div className="text-2xl font-bold text-green-500 mb-2">0</div>
              <div className="text-sm text-muted-foreground">Active Trades</div>
            </Card>
            
            <Card className="glass-card p-6">
              <div className="text-2xl font-bold gradient-text mb-2">0</div>
              <div className="text-sm text-muted-foreground">Total Trades</div>
            </Card>
          </div>

          <Card className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <div className="text-center py-8 text-muted-foreground">
              No trading activity yet. Start trading to see your activity here.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
