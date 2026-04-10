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
        console.log('🔍 useSocialMedia: Fetching /social from API...');
        
        const response = await apiClient.get<SocialData>('/social');
        
        console.log('📦 RAW API Response (Social):', response);
        console.log('📦 Success:', response.success);
        console.log('📦 Data:', response.data);

        if (response.success && response.data) {
          setSocialData(response.data);
          console.log('✅ Social Data set:', response.data);
        } else {
          throw new Error(response.error || 'Failed to fetch social media');
        }
      } catch (err) {
        console.error('❌ useSocialMedia Error:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSocialMedia();
  }, []);

  return { socialData, loading, error };
};
