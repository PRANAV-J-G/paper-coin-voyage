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

// Map backend PriceData to frontend CryptoPrice format
const mapPriceData = (priceData: any): CryptoPrice => ({
  symbol: priceData.symbol,
  name: priceData.symbol, // Backend doesn't provide name, use symbol
  price: priceData.price,
  change: priceData.change_24h || 0,
  volume: priceData.volume?.toString() || '0',
  lastUpdated: new Date().toISOString()
});

export const useCryptoPrices = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const { subscribe, unsubscribe } = useWebSocket();

  // For now, return mock data since backend doesn't have a bulk prices endpoint
  useEffect(() => {
    const mockPrices: CryptoPrice[] = [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        price: 43250.00,
        change: 2.5,
        volume: '1.2B',
        lastUpdated: new Date().toISOString()
      },
      {
        symbol: 'ETH', 
        name: 'Ethereum',
        price: 2640.00,
        change: -1.2,
        volume: '800M',
        lastUpdated: new Date().toISOString()
      }
    ];
    setPrices(mockPrices);
  }, []);

  useEffect(() => {
    // Subscribe to real-time price updates when available
    subscribe('crypto-prices', (newPrices: CryptoPrice[]) => {
      setPrices(newPrices);
    });

    return () => {
      unsubscribe('crypto-prices');
    };
  }, [subscribe, unsubscribe]);

  return {
    prices,
    isLoading: false,
    error: null,
    refetch: () => {},
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
      setPrice(mapPriceData(data));
    }
  }, [data]);

  useEffect(() => {
    if (symbol) {
      subscribe(`crypto-price-${symbol}`, (newPrice: any) => {
        setPrice(mapPriceData(newPrice));
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