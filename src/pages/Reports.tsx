
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const Reports = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Reports</h1>
            <p className="text-muted-foreground">Detailed analysis and reports of your trading performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-4">Trading Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Trades:</span>
                  <span className="font-bold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Winning Trades:</span>
                  <span className="font-bold text-green-500">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Losing Trades:</span>
                  <span className="font-bold text-red-500">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Win Rate:</span>
                  <span className="font-bold">0%</span>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-4">Export Reports</h2>
              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  Export Trading History (CSV)
                </Button>
                <Button variant="outline" className="w-full">
                  Export P&L Report (PDF)
                </Button>
                <Button variant="outline" className="w-full">
                  Export Tax Report
                </Button>
              </div>
            </Card>
          </div>

          <Card className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-4">Performance Analytics</h2>
            <div className="text-center py-8 text-muted-foreground">
              Detailed performance analytics and charts will be available once you start trading.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
