// API Client for Laravel Backend Integration

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
  isFormData?: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://localhost:8000/api';
  }

  private getAuthHeader(): Record<string, string> {
    if (typeof window === 'undefined') return {};
    
    const token = localStorage.getItem('auth_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      requiresAuth = false,
      isFormData = false,
    } = options;

    const url = `${this.baseUrl}${endpoint}`;

    const defaultHeaders: Record<string, string> = {
      'Accept': 'application/json',
    };

    if (!isFormData) {
      defaultHeaders['Content-Type'] = 'application/json';
    }

    if (requiresAuth) {
      Object.assign(defaultHeaders, this.getAuthHeader());
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          ...defaultHeaders,
          ...headers,
        },
        body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || data.message || `Error: ${response.status}`,
        };
      }

      return {
        success: true,
        data: data.data as T,
        message: data.message,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  // Auth helpers
  async login(username: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> {
    const response = await this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: { username, password },
    });

    if (response.success && response.data?.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token);
      }
    }

    return response;
  }

  async logout(): Promise<ApiResponse> {
    const response = await this.request('/auth/logout', {
      method: 'POST',
      requiresAuth: true,
    });

    if (response.success && typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }

    return response;
  }

  async getMe(): Promise<ApiResponse> {
    return this.request('/auth/me', { requiresAuth: true });
  }

  // Generic methods
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  async put<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async upload(endpoint: string, formData: FormData): Promise<ApiResponse> {
    return this.request(endpoint, {
      method: 'POST',
      body: formData,
      isFormData: true,
      requiresAuth: true,
    });
  }

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('auth_token');
  }
}

export const apiClient = new ApiClient();
