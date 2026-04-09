import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { getCachedData, setCachedData } from '@/lib/cache';

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
      // 1. Check Cache First
      const cached = getCachedData<TeamMember[]>('teams');
      if (cached) {
        setTeamMembers(cached);
        setLoading(false);
        // Lanjut fetch API di background
      }

      // 2. Fetch from API
      try {
        const response = await apiClient.get<TeamMember[]>('/teams');

        if (response.success && response.data) {
          const baseUrl = apiClient.getBackendBaseUrl();
          
          // Resolve team photo URLs
          const resolvedData = response.data.map(item => {
            const fixPhotoPath = (path: string | undefined): string => {
              if (!path) return '';
              if (path.startsWith('http')) return path; 
              
              const cleanPath = path.startsWith('/') ? path.substring(1) : path;
              return `${baseUrl}/${cleanPath}`;
            };

            return { ...item, photo: fixPhotoPath(item.photo) };
          });

          setTeamMembers(resolvedData);
          setCachedData('teams', resolvedData); // Update cache
        } else {
          if (!cached) {
            throw new Error(response.error || 'Failed to fetch team members');
          }
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
