import { PricePackage } from '@/lib/hooks';

interface PriceCardProps {
    package: PricePackage;
}

export function PriceCard({ package: pkg }: PriceCardProps) {
    return (
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative animate-float">
            <h4 className="text-2xl font-bold text-white mb-2">{pkg.title}</h4>
            <p className="text-sm text-gray-400 mb-4">{pkg.description}</p>
            <p className="text-4xl font-bold text-blue-400 mb-6">{pkg.price}</p>
            <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                    <li key={feature} className="text-gray-300 flex items-center">
                        <span className="text-green-400 mr-2">✓</span> {feature}
                    </li>
                ))}
            </ul>
            <p className="text-xs text-yellow-400 italic">{pkg.note}</p>

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
