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
  private apiToken: string;

  constructor() {
    // Menggunakan relative path '/api' agar request dicapture oleh Next.js Rewrites.
    // Request ke /api/* akan di-proxy secara otomatis ke backend http://localhost:8080/api/*
    // Ini adalah cara standar di Next.js untuk menghindari masalah CORS.
    this.baseUrl = '/api';
    
    // Public API Token untuk akses read-only ke backend
    // Bisa dioverride via environment variable NEXT_PUBLIC_API_TOKEN
    this.apiToken = process.env.NEXT_PUBLIC_API_TOKEN || 'public_e72ceca32e2c1ab4b54b7fb2a644b28c048e593fd2fa1f4bdb272f3c7bd1a915';
  }

  // Helper to get backend base URL (tanpa /api) untuk resolusi gambar
  public getBackendBaseUrl(): string {
    // Gambar perlu URL lengkap backend karena tidak di-proxy oleh Next.js
    return 'http://localhost:8080';
  }

  // Helper to convert relative image paths to full URLs
  private resolveImageUrl(path: string | null | undefined): string | null {
    if (!path) return null;
    // If already a full URL, return as-is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    // If relative path, prepend backend base URL
    const baseUrl = this.getBackendBaseUrl();
    // Remove leading slash from path if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  }

  // Helper to resolve image URLs in gallery data
  private resolveGalleryImages(gallery: any): any {
    return {
      ...gallery,
      thumbnail: this.resolveImageUrl(gallery.thumbnail) || gallery.thumbnail,
      fullImage: this.resolveImageUrl(gallery.fullImage) || gallery.fullImage,
    };
  }

  // Helper to resolve image URLs in team data
  private resolveTeamImages(team: any): any {
    return {
      ...team,
      photo: this.resolveImageUrl(team.photo) || team.photo,
    };
  }

  private getAuthHeader(): Record<string, string> {
    if (typeof window === 'undefined') return {};
    
    // Cek apakah user sedang login (admin token)
    const adminToken = localStorage.getItem('auth_token');
    if (adminToken) {
      return { 'Authorization': `Bearer ${adminToken}` };
    }
    
    // Jika tidak, gunakan public API token untuk read-only access
    return { 'Authorization': `Bearer ${this.apiToken}` };
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
