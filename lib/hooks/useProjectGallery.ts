import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';

export interface ProjectImage {
    id: number;
    name: string;
    slug: string;
    description: string;
    thumbnail: string;
    fullImage: string;
    is_show: boolean;
}

export interface ApiGalleryResponse {
    data: Array<{
        id: number;
        name: string;
        slug: string | null;
        description: string;
        photo?: string | {
            url?: string;
            data?: {
                attributes?: {
                    url: string;
                };
            };
        };
        is_show: boolean;
    }>;
}

export const useProjectGallery = () => {
    const [images, setImages] = useState<ProjectImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                // Fetch dengan populate untuk include relasi photo
                const response = await apiClient.get<ApiGalleryResponse>('/api/galleries?populate=photo');

                if (response.success && response.data && Array.isArray(response.data)) {
                    // Filter hanya yang is_show === true dan transform ke ProjectImage format
                    const filteredImages = response.data
                        .filter((item) => item.is_show === true)
                        .map((item) => {
                            // Handle photo URL dari Strapi
                            let photoUrl = '';
                            
                            // Check if photo is direct URL
                            if (typeof item.photo === 'string') {
                                photoUrl = item.photo;
                            }
                            // Check if photo is object with nested structure (Strapi media format)
                            else if (item.photo && typeof item.photo === 'object') {
                                // @ts-ignore
                                photoUrl = item.photo.url || item.photo.data?.attributes?.url || '';
                            }

                            // Prepend Strapi base URL jika photoUrl tidak dimulai dengan http
                            const strapiBaseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
                            const fullPhotoUrl = photoUrl && !photoUrl.startsWith('http')
                                ? `${strapiBaseUrl}${photoUrl}`
                                : photoUrl;

                            // Generate thumbnail URL with lower resolution (assuming Strapi format)
                            // If the photoUrl contains a path structure like /uploads/filename.jpg,
                            // we can try to create a thumbnail version
                            let thumbnailUrl = fullPhotoUrl;

                            // If photoUrl follows Strapi's format with thumbnails (e.g., has formats property)
                            if (item.photo && typeof item.photo === 'object' && item.photo.data?.attributes?.formats) {
                                // Use small thumbnail if available
                                const formats = item.photo.data.attributes.formats;
                                thumbnailUrl = formats.small?.url || formats.thumbnail?.url || fullPhotoUrl;

                                // Prepend base URL if needed
                                if (thumbnailUrl && !thumbnailUrl.startsWith('http')) {
                                    thumbnailUrl = `${strapiBaseUrl}${thumbnailUrl}`;
                                }
                            } else {
                                // Alternative: create a thumbnail URL by appending size parameters
                                // This assumes the backend supports dynamic resizing
                                thumbnailUrl = fullPhotoUrl;
                            }

                            return {
                                id: item.id,
                                name: item.name,
                                slug: item.slug || 'Uncategorized',
                                description: item.description,
                                thumbnail: thumbnailUrl || '/img/placeholder.jpg',
                                fullImage: fullPhotoUrl || '/img/placeholder.jpg',
                                is_show: item.is_show,
                            };
                        });

                    setImages(filteredImages);
                }
            } catch (err) {
                setError('Failed to fetch gallery');
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    // Get first 5 images for preview
    const getPreviewImages = (): ProjectImage[] => {
        return images.slice(0, 5);
    };

    // Get all images
    const getAllGalleryImages = (): ProjectImage[] => {
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
