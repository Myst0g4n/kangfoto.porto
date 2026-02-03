// API Configuration untuk Strapi
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api',
  PUBLIC_KEY: process.env.NEXT_PUBLIC_STRAPI_KEY || '',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

// Strapi response wrapper
export type StrapiResponse<T> = {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
