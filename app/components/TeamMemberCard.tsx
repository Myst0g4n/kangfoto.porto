import { TeamMember, useCardAnimation } from '@/lib/hooks';

interface TeamMemberCardProps {
    member: TeamMember;
    index: number;
}

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
    const { isVisible, elementRef } = useCardAnimation({ delay: index * 200 }); // Delay bertambah untuk setiap card

    return (
        <div
            ref={elementRef}
            className={`flex flex-col items-center justify-center transition-all duration-700 ease-out ${
                isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
            }`}
        >
            <div className="relative group max-w-sm w-full"> {/* Increased max-width to better fit 3 columns */}
                {/* Kartu Utama dengan efek glassmorphism dan hover */}
                <div className="bg-gradient-to-br from-gray-900/30 via-gray-800/30 to-gray-900/30 backdrop-blur-lg rounded-2xl p-1 shadow-2xl shadow-gray-900/30 border border-white/10 transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-gray-700/40">
                    <div className="bg-gray-900/80 rounded-2xl p-6 relative overflow-hidden">
                        {/* Efek dekoratif di belakang */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-500/10 rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-400/10 rounded-full -ml-12 -mb-12"></div>

                        {/* Foto yang sedikit keluar dari atas kartu */}
                        <div className="-mt-10 mb-4 relative z-10 flex justify-center">
                            <div className="relative">
                                <img src={member.photo} alt={member.name} className="w-40 h-52 object-cover rounded-xl border-2 border-white/30 transform transition-all duration-500 group-hover:scale-105 shadow-lg" /> {/* Increased image size for 3-column layout */}
                                {/* Efek cahaya di sekeliling foto */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Bagian teks di dalam kartu */}
                        <div className="pt-8 relative z-10"> {/* Memberi ruang untuk foto yang keluar */}
                            <h2 className="text-xl font-bold text-white text-center tracking-wide">{member.name}</h2>
                            <p className="text-gray-300 text-center mt-2 font-medium text-sm">{member.experience}</p>
                            <div className="mt-4 border-t border-gray-700 pt-3">
                                <h4 className="text-xs italic text-gray-300 text-center leading-relaxed">"{member.quote}"</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
