'use client';

import { useScrollAnimation } from '@/lib/hooks';
import { PriceCard } from './PriceCard';
import { usePricePackages } from '@/lib/hooks';

export default function PriceList() {
    const { visible, titleRef } = useScrollAnimation(); // Hapus gridRef karena animasi akan ditangani per card
    const { packages, loading, error } = usePricePackages();

    if (loading && packages.length === 0) {
        return (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="pricelist">
                <h3
                    ref={titleRef}
                    className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-300 to-amber-200 mb-12 text-center transition-all duration-1000 ${
                        visible.title ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
                    }`}
                >
                    Price List
                </h3>
                <div className="flex justify-center items-center h-64">
                    <p className="text-rose-100 text-xl">Loading packages...</p>
                </div>
            </section>
        );
    }

    if (error && packages.length === 0) {
        return (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="pricelist">
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-300 to-amber-200 mb-12 text-center">
                    Price List
                </h3>
                <div className="flex justify-center items-center h-64">
                    <p className="text-red-500 text-xl">Error loading packages: {error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="pricelist">
            <h3
                ref={titleRef}
                className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-300 to-amber-200 mb-12 text-center transition-all duration-1000 ${
                    visible.title ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
                }`}
            >
                Price List
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg, index) => (
                    <PriceCard key={pkg.id} package={pkg} index={index} />
                ))}
            </div>
        </section>
    );
}
