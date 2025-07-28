const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-domain.com' 
  : 'http://localhost:5000';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  bio?: string;
  created_at?: string;
  balance?: number;
  total_trades?: number;
  active_trades?: number;
  total_pnl?: number;
}

interface AuthResponse {
  token: string;
  message: string;
}

interface PriceData {
  symbol: string;
  price: number;
  change_24h?: number;
  volume?: number;
  source?: string;
}

interface TradeData {
  symbol: string;
  action: 'buy' | 'sell';
  quantity: number;
  price: number;
  timestamp: string;
}

interface PortfolioData {
  balance: number;
  holdings: Array<{
    symbol: string;
    quantity: number;
    price: number;
    value: number;
  }>;
}

interface PnLData {
  holdings_pnl: Array<{
    symbol: string;
    quantity: number;
    avg_buy_price: number;
    current_price: number;
    cost_basis: number;
    current_value: number;
    pnl: number;
  }>;
  total_pnl: number;
}

interface PortfolioValue {
  balance: number;
  holdings_value: number;
  net_worth: number;
}

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
      const response = await this.request<AuthResponse>('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      this.setToken(response.token);
      
      // Get user data after login
      const user = await this.auth.getCurrentUser();
      return { token: response.token, user };
    },

    register: async (data: { 
      firstName: string; 
      lastName: string; 
      email: string; 
      password: string;
      phone?: string;
      bio?: string;
    }) => {
      const response = await this.request<AuthResponse>('/signup', {
        method: 'POST',
        body: JSON.stringify({ 
          email: data.email, 
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone || '',
          bio: data.bio || ''
        }),
      });
      this.setToken(response.token);
      
      // Get user data after registration
      const user = await this.auth.getCurrentUser();
      return { token: response.token, user };
    },

    getProfile: async (): Promise<User> => {
      return this.request<User>('/profile');
    },

    getCurrentUser: async (): Promise<User> => {
      return this.request<User>('/me');
    },

    updateProfile: async (data: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      bio?: string;
    }) => {
      return this.request<{ message: string }>('/profile', {
        method: 'PUT',
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          bio: data.bio
        }),
      });
    },

    verifyToken: async (token: string) => {
      return this.request<{ valid: boolean; user_id?: number }>('/verify-token', {
        method: 'POST',
        body: JSON.stringify({ token }),
      });
    },

    logout: () => {
      this.setToken(null);
    },
  };

  // Crypto data endpoints
  crypto = {
    getPrice: async (symbol: string): Promise<PriceData> => {
      return this.request<PriceData>(`/price?symbol=${symbol}`);
    },

    refreshPrice: async (symbol: string): Promise<PriceData> => {
      return this.request<PriceData>(`/refresh?symbol=${symbol}`);
    },

    getBulkPrices: async (symbols: string[]): Promise<any> => {
      const symbolsParam = symbols.join(',');
      return this.request<any>(`/bulk-delta?symbols=${symbolsParam}`);
    },

    getMarketOverview: async () => {
      return this.request<{
        market_cap_usd: number;
        volume_24h_usd: number;
        liquidity_usd: number;
        btc_dominance: number;
      }>('/market-overview');
    },

    getHistoricalData: async (symbol: string, start: number, end: number) => {
      return this.request<{ history: any[] }>(`/coin-history?symbol=${symbol}&start=${start}&end=${end}`);
    },

    getMarketHistory: async (start: number, end: number) => {
      return this.request<{ history: any[] }>(`/market-history?start=${start}&end=${end}`);
    },
  };

  // Trading endpoints
  trading = {
    getPortfolio: async (userId: number): Promise<PortfolioData> => {
      return this.request<PortfolioData>(`/wallet?user_id=${userId}`);
    },

    getPortfolioValue: async (userId: number): Promise<PortfolioValue> => {
      return this.request<PortfolioValue>(`/portfolio-value?user_id=${userId}`);
    },

    buy: async (data: {
      user_id: number;
      symbol: string;
      quantity: number;
    }) => {
      return this.request<{ message: string; price: number }>('/buy', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    sell: async (data: {
      user_id: number;
      symbol: string;
      quantity: number;
    }) => {
      return this.request<{ message: string; price: number }>('/sell', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    getTrades: async (userId: number): Promise<TradeData[]> => {
      return this.request<TradeData[]>(`/transactions?user_id=${userId}`);
    },

    getActiveTrades: async (userId: number) => {
      return this.request<{ active_trades: number }>(`/active-trades?user_id=${userId}`);
    },
  };

  // Reports endpoints
  reports = {
    getPnL: async (userId: number): Promise<PnLData> => {
      return this.request<PnLData>(`/pnl?user_id=${userId}`);
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
  private subscriptions = new Map<string, (data: any) => void>();

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

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const { channel, payload } = data;
        
        if (this.subscriptions.has(channel)) {
          this.subscriptions.get(channel)!(payload);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
  }

  private reconnect(token: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect(token);
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  subscribe(channel: string, callback: (data: any) => void) {
    this.subscriptions.set(channel, callback);
    
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        action: 'subscribe',
        channel
      }));
    }
  }

  unsubscribe(channel: string) {
    this.subscriptions.delete(channel);
    
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        action: 'unsubscribe',
        channel
      }));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.subscriptions.clear();
    this.reconnectAttempts = 0;
  }
}

export const wsService = new WebSocketService();


