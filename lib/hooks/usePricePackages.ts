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
          // Pastikan features adalah array, jika string JSON maka parse dulu dengan penanganan error yang lebih baik
          const parsedPackages = response.data.map((pkg: any) => {
            let features = pkg.features;
            
            if (typeof features === 'string') {
              try {
                // Cek apakah string terlihat seperti array JSON
                if (features.trim().startsWith('[')) {
                  try {
                    // Coba parse standar
                    features = JSON.parse(features);
                  } catch (e) {
                    // Jika gagal (misal karena single quotes atau escaping), coba bersihkan
                    // 1. Hapus backslash escape characters jika ada
                    let cleaned = features.replace(/\\/g, '');
                    // 2. Ganti single quotes ke double quotes
                    cleaned = cleaned.replace(/'/g, '"');
                    // 3. Coba parse lagi
                    features = JSON.parse(cleaned);
                  }
                } else {
                  // Jika bukan format array, anggap sebagai satu fitur
                  features = [features];
                }
              } catch (e) {
                // Jika semua parsing gagal, masukkan string asli ke dalam array
                console.warn('Failed to parse features for package:', pkg.title, features);
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
