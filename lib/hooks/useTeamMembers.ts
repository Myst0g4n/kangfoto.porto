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
            let photo = item.photo || '';
            if (photo && !photo.startsWith('http')) {
              const cleanPath = photo.startsWith('/') ? photo.substring(1) : photo;
              photo = `${baseUrl}/storage/${cleanPath}`;
            }
            return { ...item, photo };
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
