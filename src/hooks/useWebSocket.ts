import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { wsService } from '@/services/api';

interface UseWebSocketOptions {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
}

export const useWebSocket = (options: UseWebSocketOptions = {}) => {
  const { user, token } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const subscriptionsRef = useRef<Map<string, (data: any) => void>>(new Map());

  useEffect(() => {
    if (token && user) {
      wsService.connect(token);
      setIsConnected(true);
      options.onConnect?.();

      return () => {
        wsService.disconnect();
        setIsConnected(false);
        options.onDisconnect?.();
      };
    }
  }, [token, user]);

  const subscribe = (channel: string, callback: (data: any) => void) => {
    subscriptionsRef.current.set(channel, callback);
    if (isConnected) {
      wsService.subscribe(channel, callback);
    }
  };

  const unsubscribe = (channel: string) => {
    subscriptionsRef.current.delete(channel);
    if (isConnected) {
      wsService.unsubscribe(channel);
    }
  };

  return {
    isConnected,
    subscribe,
    unsubscribe,
  };
};