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
        const response = await apiClient.get<GalleryItem[]>('/galleries');

        if (response.success && response.data) {
          const baseUrl = apiClient.getBackendBaseUrl();

          const resolvedData = response.data.map((item: any) => {
            const fixImagePath = (path: string | undefined): string => {
              if (!path) return '';
              if (path.startsWith('http')) return path;
              
              const slash = path.startsWith('/') ? '' : '/';
              return `${baseUrl}${slash}${path}`;
            };

            return {
              ...item,
              thumbnail: fixImagePath(item.thumbnail),
              fullImage: fixImagePath(item.full_image || item.fullImage),
            };
          });

          const filteredImages = resolvedData.filter((item) => 
            item.is_show === true || item.is_show === 1 || item.is_show === '1' || item.is_show === 'true'
          );
          
          setImages(filteredImages);
        } else {
          throw new Error(response.error || 'Failed to fetch gallery');
        }
      } catch (err) {
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
