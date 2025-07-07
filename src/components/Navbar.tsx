
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const balance = user?.balance || 10000.00;

  const handleNavigation = (path: string) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-card border-b border-border/20 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PC</span>
            </div>
            <h1 className="text-2xl font-bold gradient-text">PaperCoins</h1>
          </div>
          
          {user && (
            <div className="hidden md:flex items-center space-x-6">
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary"
                onClick={() => handleNavigation('/dashboard')}
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary"
                onClick={() => handleNavigation('/trading')}
              >
                Trading
              </Button>
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary"
                onClick={() => handleNavigation('/portfolio')}
              >
                Portfolio
              </Button>
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary"
                onClick={() => handleNavigation('/reports')}
              >
                Reports
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="glass-card px-4 py-2 rounded-lg">
                <div className="text-sm text-muted-foreground">Virtual Balance</div>
                <div className="text-lg font-bold text-accent">
                  ${balance.toLocaleString()}
                </div>
              </div>
              
              <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                Live Trading
              </Badge>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden md:block">{user?.firstName || 'User'}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:block">Logout</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                className="text-foreground hover:text-primary"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                className="bg-primary hover:bg-primary/90"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
