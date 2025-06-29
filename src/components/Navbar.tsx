
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const [balance] = useState(10000.00);

  return (
    <nav className="glass-card border-b border-border/20 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PC</span>
            </div>
            <h1 className="text-2xl font-bold gradient-text">PaperCoins</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Dashboard
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Trading
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Portfolio
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Reports
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="glass-card px-4 py-2 rounded-lg">
            <div className="text-sm text-muted-foreground">Virtual Balance</div>
            <div className="text-lg font-bold text-accent">
              ${balance.toLocaleString()}
            </div>
          </div>
          
          <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
            Live Trading
          </Badge>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
