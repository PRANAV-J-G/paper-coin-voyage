import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { useWebSocket } from './useWebSocket';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface Order {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  amount: number;
  price: number;
  type: 'market' | 'limit';
  status: 'pending' | 'filled' | 'cancelled';
  createdAt: string;
  filledAt?: string;
}

export interface Trade {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  amount: number;
  price: number;
  fee: number;
  total: number;
  timestamp: string;
}

export interface Portfolio {
  totalValue: number;
  totalGain: number;
  totalGainPercent: number;
  availableBalance: number;
  positions: {
    symbol: string;
    amount: number;
    value: number;
    gain: number;
    gainPercent: number;
  }[];
}

// Map backend TradeData to frontend Trade format
const mapTradeData = (tradeData: any, index: number): Trade => ({
  id: `${tradeData.symbol}-${tradeData.timestamp}-${index}`,
  symbol: tradeData.symbol,
  side: tradeData.action as 'buy' | 'sell',
  amount: tradeData.quantity,
  price: tradeData.price,
  fee: 0, // Backend doesn't provide fee
  total: tradeData.quantity * tradeData.price,
  timestamp: tradeData.timestamp
});

// Map backend PortfolioData to frontend Portfolio format
const mapPortfolioData = (portfolioData: any): Portfolio => ({
  totalValue: portfolioData.balance + (portfolioData.holdings?.reduce((sum: number, h: any) => sum + h.value, 0) || 0),
  totalGain: 0, // Backend doesn't provide this
  totalGainPercent: 0, // Backend doesn't provide this
  availableBalance: portfolioData.balance,
  positions: portfolioData.holdings?.map((holding: any) => ({
    symbol: holding.symbol,
    amount: holding.quantity,
    value: holding.value,
    gain: 0, // Backend doesn't provide this
    gainPercent: 0 // Backend doesn't provide this
  })) || []
});

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { subscribe, unsubscribe } = useWebSocket();

  // Backend doesn't have orders endpoint, return mock data for now
  useEffect(() => {
    setOrders([]);
  }, []);

  useEffect(() => {
    subscribe('orders', (newOrders: Order[]) => {
      setOrders(newOrders);
    });

    return () => {
      unsubscribe('orders');
    };
  }, [subscribe, unsubscribe]);

  return {
    orders,
    isLoading: false,
    error: null,
  };
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (orderData: {
      symbol: string;
      side: 'buy' | 'sell';
      amount: number;
      price?: number;
      type: 'market' | 'limit';
    }) => {
      if (!user) throw new Error('User not authenticated');
      
      const apiCall = orderData.side === 'buy' 
        ? apiService.trading.buy({
            user_id: user.id,
            symbol: orderData.symbol,
            quantity: orderData.amount
          })
        : apiService.trading.sell({
            user_id: user.id,
            symbol: orderData.symbol,
            quantity: orderData.amount
          });
      
      return apiCall;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['trades'] });
      toast({
        title: 'Order Created',
        description: 'Your order has been placed successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Order Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const { subscribe, unsubscribe } = useWebSocket();
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['portfolio'],
    queryFn: () => {
      if (!user) throw new Error('User not authenticated');
      return apiService.trading.getPortfolio(user.id);
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (data) {
      setPortfolio(mapPortfolioData(data));
    }
  }, [data]);

  useEffect(() => {
    // Subscribe to portfolio updates when available
    subscribe('portfolio', (newPortfolio: any) => {
      setPortfolio(mapPortfolioData(newPortfolio));
    });

    return () => {
      unsubscribe('portfolio');
    };
  }, [subscribe, unsubscribe]);

  return {
    portfolio,
    isLoading,
    error,
  };
};

export const useTrades = (limit: number = 50) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const { subscribe, unsubscribe } = useWebSocket();
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['trades', limit],
    queryFn: () => {
      if (!user) throw new Error('User not authenticated');
      return apiService.trading.getTrades(user.id);
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (data) {
      setTrades(data.map((trade, index) => mapTradeData(trade, index)));
    }
  }, [data]);

  useEffect(() => {
    subscribe('trades', (newTrades: any[]) => {
      setTrades(newTrades.map((trade, index) => mapTradeData(trade, index)));
    });

    return () => {
      unsubscribe('trades');
    };
  }, [subscribe, unsubscribe]);

  return {
    trades,
    isLoading,
    error,
  };
};