import { apiClient } from './client';
import { ApiResponse } from './config';

// Type definitions
export interface Portfolio {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
}

export interface Team {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
}

export interface PricePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
}

// Portfolio API calls
export const portfolioService = {
  async getAll(): Promise<ApiResponse<Portfolio[]>> {
    return apiClient.get<Portfolio[]>('/portfolios');
  },

  async getById(id: string): Promise<ApiResponse<Portfolio>> {
    return apiClient.get<Portfolio>(`/portfolios/${id}`);
  },

  async create(data: Omit<Portfolio, 'id'>): Promise<ApiResponse<Portfolio>> {
    return apiClient.post<Portfolio>('/portfolios', data);
  },

  async update(id: string, data: Partial<Portfolio>): Promise<ApiResponse<Portfolio>> {
    return apiClient.put<Portfolio>(`/portfolios/${id}`, data);
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/portfolios/${id}`);
  },
};

// Team API calls
export const teamService = {
  async getAll(): Promise<ApiResponse<Team[]>> {
    return apiClient.get<Team[]>('/teams');
  },

  async getById(id: string): Promise<ApiResponse<Team>> {
    return apiClient.get<Team>(`/teams/${id}`);
  },

  async create(data: Omit<Team, 'id'>): Promise<ApiResponse<Team>> {
    return apiClient.post<Team>('/teams', data);
  },

  async update(id: string, data: Partial<Team>): Promise<ApiResponse<Team>> {
    return apiClient.put<Team>(`/teams/${id}`, data);
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/teams/${id}`);
  },
};

// Price Package API calls
export const priceService = {
  async getAll(): Promise<ApiResponse<PricePackage[]>> {
    return apiClient.get<PricePackage[]>('/prices');
  },

  async getById(id: string): Promise<ApiResponse<PricePackage>> {
    return apiClient.get<PricePackage>(`/prices/${id}`);
  },

  async create(data: Omit<PricePackage, 'id'>): Promise<ApiResponse<PricePackage>> {
    return apiClient.post<PricePackage>('/prices', data);
  },

  async update(id: string, data: Partial<PricePackage>): Promise<ApiResponse<PricePackage>> {
    return apiClient.put<PricePackage>(`/prices/${id}`, data);
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/prices/${id}`);
  },
};
