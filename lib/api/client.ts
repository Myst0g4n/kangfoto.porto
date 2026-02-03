import { API_CONFIG, ApiResponse } from './config';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  params?: Record<string, any>;
}

class ApiClient {
  private baseUrl: string;
  private timeout: number;
  private publicKey: string;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.publicKey = API_CONFIG.PUBLIC_KEY;
  }

  private buildQueryString(params?: Record<string, any>): string {
    if (!params) return '';
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const query = searchParams.toString();
    return query ? `?${query}` : '';
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.timeout,
      params,
    } = options;

    const queryString = this.buildQueryString(params);
    const url = `${this.baseUrl}${endpoint}${queryString}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const defaultHeaders: Record<string, string> = {
      ...API_CONFIG.HEADERS,
    };

    if (this.publicKey) {
      defaultHeaders['Authorization'] = `Bearer ${this.publicKey}`;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          ...defaultHeaders,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || data.error?.message || `Error: ${response.status}`,
        };
      }

      // Strapi wraps data in a 'data' property
      const responseData = data.data || data;

      return {
        success: true,
        data: responseData as T,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  async put<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  async patch<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }
}

// Singleton instance
export const apiClient = new ApiClient();
