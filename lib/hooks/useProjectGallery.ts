import { useEffect, useState } from 'react';

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
    const [images, setImages] = useState<ProjectImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await fetch('/data/galleries.json');

                if (response.ok) {
                    const data: ProjectImage[] = await response.json();
                    
                    // Filter hanya yang is_show === true
                    const filteredImages = data.filter((item) => item.is_show === true);
                    
                    setImages(filteredImages);
                } else {
                    throw new Error('Failed to fetch gallery');
                }
            } catch (err) {
                setError('Failed to fetch gallery');
                console.error('Error fetching gallery:', err);
                
                // Set data default jika terjadi error
                setImages([]);
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
