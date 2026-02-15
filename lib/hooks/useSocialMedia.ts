import { useEffect, useState } from 'react';

export interface SocialData {
  facebook: string;
  instagram: string;
  tiktok: string;
  twitter: string;
}

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
    const fetchSocialMedia = async () => {
      try {
        const response = await fetch('/data/social.json');
        
        if (!response.ok) {
          throw new Error('Failed to fetch social media data');
        }
        
        const data: SocialData = await response.json();
        
        // Pastikan semua field memiliki nilai, jika tidak ada gunakan '#'
        const processedData: SocialData = {
          facebook: data.facebook || '#',
          instagram: data.instagram || '#',
          tiktok: data.tiktok || '#',
          twitter: data.twitter || '#',
        };

        setSocialData(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
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
    };

    fetchSocialMedia();
  }, []);

  return { socialData, loading, error };
};