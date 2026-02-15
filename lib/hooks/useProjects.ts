import { useEffect, useState } from 'react';
import { getFilteredData, GalleryItem } from '../utils/dataManager';

export const useProjects = () => {
    const [projects, setProjects] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            // Ambil data langsung dari sistem manajemen data
            const data = getFilteredData.galleries.active();
            
            setProjects(data);
        } catch (err) {
            setError('Failed to fetch projects');
            console.error('Error fetching projects:', err);

            // Set data default jika terjadi error
            setProjects([]);
        } finally {
            setLoading(false);
        }
    }, []);

    return { projects, loading, error };
};
