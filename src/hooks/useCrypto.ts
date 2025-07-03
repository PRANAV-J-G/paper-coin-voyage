import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { useWebSocket } from './useWebSocket';

export interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
  marketCap?: number;
  lastUpdated: string;
}

export const useCryptoPrices = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const { subscribe, unsubscribe } = useWebSocket();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['crypto-prices'],
    queryFn: () => apiService.crypto.getPrices(),
    refetchInterval: 30000, // Fallback polling every 30 seconds
  });

  useEffect(() => {
    if (data) {
      setPrices(data);
    }
  }, [data]);

  useEffect(() => {
    // Subscribe to real-time price updates
    subscribe('crypto-prices', (newPrices: CryptoPrice[]) => {
      setPrices(newPrices);
    });

    return () => {
      unsubscribe('crypto-prices');
    };
  }, [subscribe, unsubscribe]);

  return {
    prices,
    isLoading,
    error,
    refetch,
  };
};

export const useCryptoPrice = (symbol: string) => {
  const [price, setPrice] = useState<CryptoPrice | null>(null);
  const { subscribe, unsubscribe } = useWebSocket();

  const { data, isLoading, error } = useQuery({
    queryKey: ['crypto-price', symbol],
    queryFn: () => apiService.crypto.getPrice(symbol),
    enabled: !!symbol,
  });

  useEffect(() => {
    if (data) {
      setPrice(data);
    }
  }, [data]);

  useEffect(() => {
    if (symbol) {
      subscribe(`crypto-price-${symbol}`, (newPrice: CryptoPrice) => {
        setPrice(newPrice);
      });

      return () => {
        unsubscribe(`crypto-price-${symbol}`);
      };
    }
  }, [symbol, subscribe, unsubscribe]);

  return {
    price,
    isLoading,
    error,
  };
};