
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TradingDashboard = () => {
  const [cryptoData] = useState([
    { symbol: 'BTC', name: 'Bitcoin', price: 43250.80, change: 2.34, volume: '28.5B' },
    { symbol: 'ETH', name: 'Ethereum', price: 2580.45, change: -1.23, volume: '12.3B' },
    { symbol: 'ADA', name: 'Cardano', price: 0.4521, change: 5.67, volume: '2.1B' },
    { symbol: 'SOL', name: 'Solana', price: 98.32, change: 3.45, volume: '1.8B' },
    { symbol: 'DOT', name: 'Polkadot', price: 6.78, change: -0.89, volume: '852M' },
    { symbol: 'LINK', name: 'Chainlink', price: 14.25, change: 1.76, volume: '1.2B' },
  ]);

  const [portfolio] = useState({
    totalValue: 10250.50,
    totalGain: 250.50,
    totalGainPercent: 2.51,
    positions: [
      { symbol: 'BTC', amount: 0.05, value: 2162.54, gain: 45.30 },
      { symbol: 'ETH', amount: 1.2, value: 3096.54, gain: -15.20 },
      { symbol: 'ADA', amount: 500, value: 226.05, gain: 12.80 },
    ]
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card crypto-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${portfolio.totalValue.toLocaleString()}</div>
            <div className={`text-sm flex items-center mt-1 ${portfolio.totalGain >= 0 ? 'trading-green' : 'trading-red'}`}>
              {portfolio.totalGain >= 0 ? '+' : ''}${portfolio.totalGain.toFixed(2)} ({portfolio.totalGainPercent}%)
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${(10000 - (portfolio.totalValue - 10000)).toLocaleString()}</div>
            <div className="text-sm text-muted-foreground mt-1">Ready to trade</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Active Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{portfolio.positions.length}</div>
            <div className="text-sm text-muted-foreground mt-1">Cryptocurrencies</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">24h Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$2.4K</div>
            <div className="text-sm text-accent mt-1">+15.2% vs yesterday</div>
          </CardContent>
        </Card>
      </div>

      {/* Market Overview */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-xl">Live Market Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Asset</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Price</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">24h Change</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Volume</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {cryptoData.map((crypto) => (
                  <tr key={crypto.symbol} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{crypto.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <div className="font-medium">{crypto.symbol}</div>
                          <div className="text-sm text-muted-foreground">{crypto.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-mono">
                      ${crypto.price.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Badge 
                        variant="secondary" 
                        className={`${crypto.change >= 0 ? 'bg-accent/20 text-accent' : 'bg-destructive/20 text-destructive'}`}
                      >
                        {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right text-muted-foreground">
                      ${crypto.volume}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex space-x-2 justify-center">
                        <Button size="sm" className="bg-accent hover:bg-accent/90 text-black">
                          Buy
                        </Button>
                        <Button size="sm" variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                          Sell
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Current Positions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-xl">Your Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolio.positions.map((position) => (
              <div key={position.symbol} className="flex items-center justify-between p-4 glass-card rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{position.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <div className="font-medium">{position.symbol}</div>
                    <div className="text-sm text-muted-foreground">{position.amount} {position.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${position.value.toLocaleString()}</div>
                  <div className={`text-sm ${position.gain >= 0 ? 'trading-green' : 'trading-red'}`}>
                    {position.gain >= 0 ? '+' : ''}${position.gain.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradingDashboard;
