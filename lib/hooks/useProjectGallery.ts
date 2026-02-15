import { useEffect, useState } from 'react';
import { getFilteredData, GalleryItem } from '../utils/dataManager';

export interface ProjectImage {
    id: number;
    name: string;
    slug: string;
    description: string;
    thumbnail: string;
    fullImage: string;
    is_show: boolean;
}

export const useProjectGallery = () => {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            // Ambil data langsung dari sistem manajemen data
            const data = getFilteredData.galleries.active();
            
            setImages(data);
        } catch (err) {
            setError('Failed to fetch gallery');
            console.error('Error fetching gallery:', err);

            // Set data default jika terjadi error
            setImages([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Get first 5 images for preview
    const getPreviewImages = (): GalleryItem[] => {
        return getFilteredData.galleries.preview(5);
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
