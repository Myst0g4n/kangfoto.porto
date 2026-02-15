import { useState, useEffect } from 'react';
import { getData, SocialData } from '../utils/dataManager';

/**
 * Interface untuk data social media
 */
export interface SocialData {
  facebook: string;
  instagram: string;
  tiktok: string;
  twitter: string;
}

/**
 * Custom hook untuk mengelola data social media dari file JSON
 * @returns socialData - Objek berisi link social media
 * @returns loading - Status loading data
 * @returns error - Pesan error jika terjadi kesalahan
 */
export const useSocialMedia = () => {
  const [socialData, setSocialData] = useState<SocialData>({
    facebook: '#',
    instagram: '#',
    tiktok: '#',
    twitter: '#',
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Ambil data langsung dari sistem manajemen data
      const data = getData.social();
      
      // Pastikan semua field memiliki nilai, jika tidak ada gunakan '#'
      const processedData: SocialData = {
        facebook: data.facebook || '#',
        instagram: data.instagram || '#',
        tiktok: data.tiktok || '#',
        twitter: data.twitter || '#',
      };

      setSocialData(processedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan tidak diketahui';
      setError(errorMessage);
      console.error('Error fetching social media:', err);
      
      // Tetap set data default jika terjadi error
      setSocialData({
        facebook: '#',
        instagram: '#',
        tiktok: '#',
        twitter: '#',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { socialData, loading, error };
};