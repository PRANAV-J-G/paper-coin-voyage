
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      title: "Real-Time Trading",
      description: "Execute trades instantly with live market data from Live Coin Watch API",
      icon: "⚡",
    },
    {
      title: "Portfolio Tracking",
      description: "Monitor your $10,000 virtual portfolio across 50+ cryptocurrencies",
      icon: "📊",
    },
    {
      title: "Risk-Free Environment",
      description: "Learn and practice trading strategies without financial risk",
      icon: "🛡️",
    },
    {
      title: "Advanced Analytics",
      description: "Comprehensive reports and insights on your trading performance",
      icon: "📈",
    },
    {
      title: "Secure Authentication",
      description: "JWT-based authentication with enterprise-grade security",
      icon: "🔐",
    },
    {
      title: "Microservices Architecture",
      description: "Built with scalable Flask microservices and PostgreSQL",
      icon: "🏗️",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl font-bold">
          Powerful <span className="gradient-text">Trading Features</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to master cryptocurrency trading in a safe, simulated environment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card 
            key={feature.title} 
            className="glass-card hover:crypto-glow transition-all duration-300 hover:scale-105"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Features;
