import { useEffect, useState } from 'react';
import { getData, TeamMember } from '../utils/dataManager';

export const useTeamMembers = (): TeamMember[] => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

    useEffect(() => {
        try {
            // Ambil data langsung dari sistem manajemen data
            const data = getData.teams();
            setTeamMembers(data);
        } catch (error) {
            console.error('Error fetching team members:', error);
            // Fallback data jika terjadi error
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
    }, []);

    return teamMembers;
};