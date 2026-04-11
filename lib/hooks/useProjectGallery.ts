import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';

export interface GalleryItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  fullImage: string;
  is_show: boolean;
  date_added: string;
}

export const useProjectGallery = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // DEBUG: Log before fetch
        console.log('🔍 useProjectGallery: Fetching /galleries from API...');
        
        const response = await apiClient.get<GalleryItem[]>('/galleries');

        // DEBUG: Log raw response
        console.log('📦 RAW API Response (Galleries):', response);
        console.log('📦 Success:', response.success);
        console.log('📦 Data:', response.data);
        console.log('📦 Error:', response.error);

        if (response.success && response.data) {
          const baseUrl = apiClient.getBackendBaseUrl();
          console.log('🌐 Base URL:', baseUrl);

          const resolvedData = response.data.map(item => {
            const fixImagePath = (path: string | undefined): string => {
              if (!path) return '';
              if (path.startsWith('http')) return path;
              
              // Ensure proper slash between baseUrl and path
              const slash = path.startsWith('/') ? '' : '/';
              return `${baseUrl}${slash}${path}`;
            };

            return {
              ...item,
              thumbnail: fixImagePath(item.thumbnail),
              fullImage: fixImagePath(item.full_image),
            };
          });

          console.log('🖼️ Resolved Galleries:', resolvedData);

          // Filter only visible galleries
          // Cek berbagai kemungkinan format is_show dari backend (true, 1, "true", "1")
          const filteredImages = resolvedData.filter((item) => 
            item.is_show === true || item.is_show === 1 || item.is_show === '1' || item.is_show === 'true'
          );
          
          console.log('👀 Visible Galleries count:', filteredImages.length);
          console.log('👀 Visible Galleries data:', filteredImages);
          
          setImages(filteredImages);
        } else {
          throw new Error(response.error || 'Failed to fetch gallery');
        }
      } catch (err) {
        console.error('❌ useProjectGallery Error:', err);
        setError('Failed to fetch gallery');
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return { images, loading, error };
};
