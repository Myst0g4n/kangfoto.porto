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
          // Pastikan features adalah array, jika string JSON maka parse dulu
          const parsedPackages = response.data.map((pkg: any) => {
            let features = pkg.features;
            
            if (typeof features === 'string') {
              try {
                // Cek apakah string terlihat seperti array JSON
                if (features.trim().startsWith('[')) {
                  features = JSON.parse(features);
                } else {
                  // Jika bukan format JSON, anggap sebagai satu fitur
                  features = [features];
                }
              } catch (e) {
                // Jika parsing gagal, masukkan string asli ke dalam array
                console.warn('Failed to parse features for package:', pkg.title);
                features = [features];
              }
            }

            return {
              ...pkg,
              features: Array.isArray(features) ? features : []
            };
          });
          setPackages(parsedPackages);
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
