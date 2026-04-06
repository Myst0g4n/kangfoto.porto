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
        console.log('🔍 useProjectGallery: Fetching from /api/galleries...');
        const response = await apiClient.get<GalleryItem[]>('/galleries');
        
        console.log('📦 useProjectGallery: Raw API Response:', response);
        console.log('📦 useProjectGallery: Response success:', response.success);
        console.log('📦 useProjectGallery: Response data:', response.data);
        console.log('📦 useProjectGallery: Response error:', response.error);
        
        if (response.success && response.data) {
          console.log('✅ useProjectGallery: Data received, count:', response.data.length);
          console.log('✅ useProjectGallery: First item (BEFORE resolve):', response.data[0]);
          console.log('✅ useProjectGallery: First item thumbnail (BEFORE):', response.data[0]?.thumbnail);
          console.log('✅ useProjectGallery: First item fullImage (BEFORE):', response.data[0]?.fullImage);
          
          // Resolve image URLs to full backend URLs
          const resolvedData = response.data.map(item => {
            const baseUrl = apiClient.getBackendBaseUrl();
            
            // Fungsi helper untuk memastikan path punya '/' di depan
            const fixPath = (path: string | undefined): string => {
              if (!path) return '';
              if (path.startsWith('http')) return path; // Sudah URL lengkap
              return path.startsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`;
            };

            return {
              ...item,
              thumbnail: fixPath(item.thumbnail),
              fullImage: fixPath(item.fullImage),
            };
          });
          
          console.log('🌐 useProjectGallery: After URL resolution, first item:', resolvedData[0]);
          console.log('🌐 useProjectGallery: Resolved thumbnail:', resolvedData[0]?.thumbnail);
          console.log('🌐 useProjectGallery: Resolved fullImage:', resolvedData[0]?.fullImage);
          
          // Filter only visible galleries
          const filteredImages = resolvedData.filter((item) => item.is_show === true);
          console.log('🖼️ useProjectGallery: After filtering (is_show=true), count:', filteredImages.length);
          console.log('🖼️ useProjectGallery: Filtered first item:', filteredImages[0]);
          console.log('🖼️ useProjectGallery: Filtered first item thumbnail:', filteredImages[0]?.thumbnail);
          console.log('🖼️ useProjectGallery: Filtered first item fullImage:', filteredImages[0]?.fullImage);
          
          setImages(filteredImages);
        } else {
          console.error('❌ useProjectGallery: Failed to fetch gallery');
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
