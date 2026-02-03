import { useEffect, useState } from 'react';

export interface TeamMember {
    id: number;
    name: string;
    experience: string;  // field atau experiences dari Strapi
    quote: string;
    photo: string;
}

export const useTeamMembers = (): TeamMember[] => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await fetch('/api/members');
                if (!response.ok) {
                    throw new Error(`Failed to fetch team members: ${response.status} ${response.statusText}`);
                }
                const data: TeamMember[] = await response.json();
                setTeamMembers(data);
            } catch (error) {
                console.error('Error fetching team members:', error);
                // Fallback data jika API gagal
                setTeamMembers([
                    {
                        id: 1,
                        name: "Data Tidak Tersedia",
                        experience: "Terjadi kesalahan saat memuat data",
                        quote: "Silakan coba lagi nanti",
                        photo: "/placeholder-team-member.jpg"
                    }
                ]);
            }
        };

        fetchTeamMembers();
    }, []);

    return teamMembers;
};