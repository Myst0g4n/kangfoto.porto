import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';

export interface SocialData {
  facebook: string | null;
  instagram: string | null;
  tiktok: string | null;
  twitter: string | null;
}

export const useSocialMedia = () => {
  const [socialData, setSocialData] = useState<SocialData>({
    facebook: null,
    instagram: null,
    tiktok: null,
    twitter: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const response = await apiClient.get<SocialData>('/social');
        
        if (response.success && response.data) {
          setSocialData(response.data);
        } else {
          throw new Error(response.error || 'Failed to fetch social media');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching social media:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialMedia();
  }, []);

  return { socialData, loading, error };
};
