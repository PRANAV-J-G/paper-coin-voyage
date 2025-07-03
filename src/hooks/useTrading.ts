import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { useWebSocket } from './useWebSocket';
import { useToast } from '@/hooks/use-toast';

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

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { subscribe, unsubscribe } = useWebSocket();

  const { data, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: () => apiService.trading.getOrders(),
  });

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

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
    isLoading,
    error,
  };
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (orderData: {
      symbol: string;
      side: 'buy' | 'sell';
      amount: number;
      price?: number;
      type: 'market' | 'limit';
    }) => apiService.trading.createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
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

  const { data, isLoading, error } = useQuery({
    queryKey: ['portfolio'],
    queryFn: () => apiService.trading.getPortfolio(),
    retry: false, // Don't retry failed requests
    enabled: false, // Disable auto-fetching for now since backend isn't ready
  });

  useEffect(() => {
    if (data) {
      setPortfolio(data);
    }
  }, [data]);

  useEffect(() => {
    // Subscribe to portfolio updates when available
    subscribe('portfolio', (newPortfolio: Portfolio) => {
      setPortfolio(newPortfolio);
    });

    return () => {
      unsubscribe('portfolio');
    };
  }, [subscribe, unsubscribe]);

  return {
    portfolio,
    isLoading: false, // Don't show loading state when backend is not ready
    error,
  };
};

export const useTrades = (limit: number = 50) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const { subscribe, unsubscribe } = useWebSocket();

  const { data, isLoading, error } = useQuery({
    queryKey: ['trades', limit],
    queryFn: () => apiService.trading.getTrades(limit),
  });

  useEffect(() => {
    if (data) {
      setTrades(data);
    }
  }, [data]);

  useEffect(() => {
    subscribe('trades', (newTrades: Trade[]) => {
      setTrades(newTrades);
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