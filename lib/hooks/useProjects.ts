import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';

export interface Project {
    id: number;
    attributes?: {
        title: string;
        description?: string;
        image?: {
            data?: {
                attributes?: {
                    url: string;
                };
            };
        };
    };
    title?: string;
    image?: string;
}

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await apiClient.get<Project[]>('/api/galleries');
                
                if (response.success && response.data) {
                    setProjects(Array.isArray(response.data) ? response.data : [response.data]);
                }
            } catch (err) {
                setError('Failed to fetch projects');
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return { projects, loading, error };
};
