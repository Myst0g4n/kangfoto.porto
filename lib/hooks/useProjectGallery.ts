import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { getCachedData, setCachedData } from '@/lib/cache';

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
      // 1. Check Cache First
      const cached = getCachedData<GalleryItem[]>('galleries');
      if (cached) {
        setImages(cached);
        setLoading(false);
        // Kita lanjut fetch API di background untuk update cache jika perlu,
        // tapi UI sudah loading selesai.
      }

      // 2. Fetch from API
      try {
        const response = await apiClient.get<GalleryItem[]>('/galleries');

        if (response.success && response.data) {
          const baseUrl = apiClient.getBackendBaseUrl();

          // Resolve image URLs according to Backend API Documentation v2.2.0
          // Docs: Images are stored as relative paths like "/uploads/gallery/image.jpg"
          // To display: BASE_URL + image_path (e.g., http://localhost:8080/uploads/gallery/image.jpg)
          const resolvedData = response.data.map(item => {
            const fixImagePath = (path: string | undefined): string => {
              if (!path) return '';
              if (path.startsWith('http')) return path; // Already full URL
              
              // Path dari backend sudah termasuk "/" di depan (e.g., "/uploads/...")
              // Langsung gabungkan dengan BASE_URL
              return `${baseUrl}${path}`;
            };

            // Map backend snake_case fields to frontend camelCase
            return {
              ...item,
              thumbnail: fixImagePath(item.thumbnail),
              fullImage: fixImagePath(item.full_image), // Backend uses full_image
            };
          });

          // Filter only visible galleries
          const filteredImages = resolvedData.filter((item) => item.is_show === true);
          setImages(filteredImages);
          setCachedData('galleries', filteredImages); // Update cache
        } else {
          // Jika API gagal dan tidak ada cache, tampilkan error
          if (!cached) {
             throw new Error(response.error || 'Failed to fetch gallery');
          }
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
