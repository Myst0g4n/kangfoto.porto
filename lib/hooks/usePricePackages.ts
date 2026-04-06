import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';

export interface PricePackage {
  id: number;
  title: string;
  description: string;
  price: string;
  features: string[];
  note: string;
}

export const usePricePackages = () => {
  const [packages, setPackages] = useState<PricePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await apiClient.get<PricePackage[]>('/packages');
        
        if (response.success && response.data) {
          setPackages(response.data);
        } else {
          throw new Error(response.error || 'Failed to fetch packages');
        }
      } catch (err) {
        setError('Failed to fetch packages');
        console.error('Error fetching packages:', err);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return { packages, loading, error };
};
