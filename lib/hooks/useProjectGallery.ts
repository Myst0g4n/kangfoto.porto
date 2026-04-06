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
          // Filter only visible galleries
          const filteredImages = response.data.filter((item) => item.is_show === true);
          setImages(filteredImages);
        } else {
          throw new Error(response.error || 'Failed to fetch gallery');
        }
      } catch (err) {
        setError('Failed to fetch gallery');
        console.error('Error fetching gallery:', err);
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
