import { useCardAnimation } from '@/lib/hooks';
import { PricePackage } from '@/lib/hooks/usePricePackages';

interface PriceCardProps {
    package: PricePackage;
    index: number;
}

export function PriceCard({ package: pkg, index }: PriceCardProps) {
    const { isVisible, elementRef } = useCardAnimation({ delay: index * 200 });

    // WhatsApp number dari environment variable
    // Format: kode negara + nomor tanpa tanda '+' atau spasi
    // Contoh: 6281234567890
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890';

    // Buat pesan WhatsApp otomatis sesuai paket
    const whatsappMessage = encodeURIComponent(
        `Halo KangFoto! Saya tertarik dengan *${pkg.title}*.\n\n` +
        `💰 Harga: ${pkg.price}\n` +
        `${pkg.description}\n\n` +
        `Bisa konsultasi lebih lanjut? Terima kasih!`
    );

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    const handleWhatsAppClick = () => {
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div
            ref={elementRef}
            className={`bg-gray-800 rounded-lg p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative ${
                isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
            } ${
                isVisible ? 'animate-float' : ''
            }`}
        >
            <h4 className="text-2xl font-bold text-white mb-2">{pkg.title}</h4>
            <p className="text-sm text-gray-400 mb-4">{pkg.description}</p>
            <p className="text-4xl font-bold text-blue-400 mb-6">{pkg.price}</p>
            <ul className="space-y-3 mb-8">
                {Array.isArray(pkg.features) ? (
                    pkg.features.map((feature: string) => (
                        <li key={feature} className="text-gray-300 flex items-center">
                            <span className="text-green-400 mr-2">✓</span> {feature}
                        </li>
                    ))
                ) : (
                    <li className="text-gray-400">No features listed</li>
                )}
            </ul>
            <p className="text-xs text-yellow-400 italic mb-6">{pkg.note}</p>

            {/* Tombol WhatsApp */}
            <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
            >
                {/* WhatsApp Icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Pesan / Konsultasi
            </button>

            {/* Floating animation effect */}
            <style jsx>{`
                @keyframes float {
                    0% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                    100% {
                        transform: translateY(0px);
                    }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
