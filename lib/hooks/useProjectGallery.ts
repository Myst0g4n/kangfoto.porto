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
          
          // Resolve image URLs according to API Documentation
          const resolvedData = response.data.map(item => {
            const fixImagePath = (path: string | undefined): string => {
              if (!path) return '';
              if (path.startsWith('http')) return path; 
              
              const cleanPath = path.startsWith('/') ? path.substring(1) : path;
              return `${baseUrl}/storage/${cleanPath}`;
            };

            return {
              ...item,
              thumbnail: fixImagePath(item.thumbnail),
              fullImage: fixImagePath(item.fullImage),
            };
          });
          
          // Filter only visible galleries
          const filteredImages = resolvedData.filter((item) => item.is_show === true);
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

  // Get first 5 images for preview
  const getPreviewImages = (): GalleryItem[] => {
    return images.slice(0, 5);
  };

  // Get all images
  const getAllGalleryImages = (): GalleryItem[] => {
    return images;
  };

  return {
    images,
    loading,
    error,
    getPreviewImages,
    getAllGalleryImages,
  };
};
