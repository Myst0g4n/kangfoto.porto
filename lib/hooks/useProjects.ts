import { useEffect, useState } from 'react';

export interface Project {
    id: number;
    name: string;
    slug: string;
    description: string;
    thumbnail: string;
    fullImage: string;
    is_show: boolean;
}

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/data/galleries.json');

                if (response.ok) {
                    const data: Project[] = await response.json();
                    
                    // Filter hanya yang is_show === true
                    const filteredProjects = data.filter((item) => item.is_show === true);
                    
                    setProjects(filteredProjects);
                } else {
                    throw new Error('Failed to fetch projects');
                }
            } catch (err) {
                setError('Failed to fetch projects');
                console.error('Error fetching projects:', err);
                
                // Set data default jika terjadi error
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return { projects, loading, error };
};
