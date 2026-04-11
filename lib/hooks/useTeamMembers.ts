import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';

export interface TeamMember {
  id: number;
  name: string;
  experience: string;
  quote: string;
  photo: string;
}

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await apiClient.get<TeamMember[]>('/teams');

        if (response.success && response.data) {
          const baseUrl = apiClient.getBackendBaseUrl();
          
          const resolvedData = response.data.map(item => {
            const fixPhotoPath = (path: string | undefined): string => {
              if (!path) return '';
              if (path.startsWith('http')) return path;
              
              const slash = path.startsWith('/') ? '' : '/';
              return `${baseUrl}${slash}${path}`;
            };

            return { ...item, photo: fixPhotoPath(item.photo) };
          });

          setTeamMembers(resolvedData);
        } else {
          throw new Error(response.error || 'Failed to fetch team members');
        }
      } catch (err) {
        setError('Failed to fetch team members');
        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return teamMembers;
};
