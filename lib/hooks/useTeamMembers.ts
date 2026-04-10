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
        console.log('🔍 useTeamMembers: Fetching /teams from API...');
        
        const response = await apiClient.get<TeamMember[]>('/teams');

        console.log('📦 RAW API Response (Teams):', response);
        console.log('📦 Success:', response.success);
        console.log('📦 Data:', response.data);

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

          console.log('📸 Resolved Team Members:', resolvedData);
          setTeamMembers(resolvedData);
        } else {
          throw new Error(response.error || 'Failed to fetch team members');
        }
      } catch (err) {
        console.error('❌ useTeamMembers Error:', err);
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
