const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-domain.com/api' 
  : 'http://localhost:5000/api';

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // Authentication endpoints
  auth = {
    login: async (email: string, password: string) => {
      const response = await this.request<{ token: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      this.setToken(response.token);
      return response;
    },

    register: async (data: { firstName: string; lastName: string; email: string; password: string }) => {
      const response = await this.request<{ token: string; user: any }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      this.setToken(response.token);
      return response;
    },

    getProfile: async () => {
      return this.request<any>('/auth/profile');
    },

    updateProfile: async (data: any) => {
      return this.request<any>('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    logout: () => {
      this.setToken(null);
    },
  };

  // Crypto data endpoints
  crypto = {
    getPrices: async () => {
      return this.request<any[]>('/crypto/prices');
    },

    getPrice: async (symbol: string) => {
      return this.request<any>(`/crypto/prices/${symbol}`);
    },

    getHistoricalData: async (symbol: string, period: string = '1d') => {
      return this.request<any>(`/crypto/historical/${symbol}?period=${period}`);
    },
  };

  // Trading endpoints
  trading = {
    getOrders: async () => {
      return this.request<any[]>('/trading/orders');
    },

    createOrder: async (orderData: {
      symbol: string;
      side: 'buy' | 'sell';
      amount: number;
      price?: number;
      type: 'market' | 'limit';
    }) => {
      return this.request<any>('/trading/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
    },

    cancelOrder: async (orderId: string) => {
      return this.request<any>(`/trading/orders/${orderId}`, {
        method: 'DELETE',
      });
    },

    getPortfolio: async () => {
      return this.request<any>('/trading/portfolio');
    },

    getTrades: async (limit: number = 50) => {
      return this.request<any[]>(`/trading/trades?limit=${limit}`);
    },
  };

  // Reports endpoints
  reports = {
    getPerformance: async (period: string = '1m') => {
      return this.request<any>(`/reports/performance?period=${period}`);
    },

    getTradingStats: async () => {
      return this.request<any>('/reports/stats');
    },

    exportTrades: async (format: 'csv' | 'json' = 'csv') => {
      return this.request<any>(`/reports/export?format=${format}`);
    },
  };
}

export const apiService = new ApiService(API_BASE_URL);

// WebSocket connection for real-time data
class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  connect(token: string) {
    const wsUrl = process.env.NODE_ENV === 'production'
      ? 'wss://your-backend-domain.com/ws'
      : 'ws://localhost:5000/ws';

    this.ws = new WebSocket(`${wsUrl}?token=${token}`);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.reconnect(token);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private reconnect(token: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Reconnecting WebSocket (attempt ${this.reconnectAttempts})`);
        this.connect(token);
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  subscribe(channel: string, callback: (data: any) => void) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ action: 'subscribe', channel }));
      
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.channel === channel) {
          callback(data.data);
        }
      };
    }
  }

  unsubscribe(channel: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ action: 'unsubscribe', channel }));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const wsService = new WebSocketService();