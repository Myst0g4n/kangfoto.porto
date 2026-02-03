'use client';

import { useScrollAnimation, useTeamMembers } from '@/lib/hooks';
import { TeamMemberCard } from './TeamMemberCard';

export default function Team() {
    const { visible, titleRef, membersRef } = useScrollAnimation();
    const teamMembers = useTeamMembers();

    return (
        <section className="py-16 bg-black/20" id="team">
            <div className="max-w-4xl mx-auto">
                <h3
                    ref={titleRef}
                    className={`text-4xl font-bold text-white mb-12 text-center transition-all duration-1000 ${
                        visible.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    Our Teams
                </h3>
                <div
                    ref={membersRef}
                    className={`grid grid-cols-1 gap-8 transition-all duration-1000 ${
                        visible.members ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    {teamMembers.length > 0 ? (
                        teamMembers.map((member, index) => (
                            <TeamMemberCard key={member.id} member={member} index={index} />
                        ))
                    ) : (
                        <div className="text-center text-white py-8">
                            <p>Loading team members...</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}