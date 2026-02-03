'use client';

import { useScrollAnimation } from '@/lib/hooks';
import { PriceCard } from './PriceCard';
import { usePricePackages } from '@/lib/hooks';

export default function PriceList() {
    const { visible, titleRef, gridRef } = useScrollAnimation();
    const { packages, loading, error } = usePricePackages();

    if (loading && packages.length === 0) {
        return (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="pricelist">
                <h3
                    ref={titleRef}
                    className={`text-4xl font-bold text-white mb-12 text-center transition-all duration-1000 ${
                        visible.title ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
                    }`}
                >
                    Price List
                </h3>
                <div className="flex justify-center items-center h-64">
                    <p className="text-white text-xl">Loading packages...</p>
                </div>
            </section>
        );
    }

    if (error && packages.length === 0) {
        return (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="pricelist">
                <h3 className="text-4xl font-bold text-white mb-12 text-center">
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
                className={`text-4xl font-bold text-white mb-12 text-center transition-all duration-1000 ${
                    visible.title ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
                }`}
            >
                Price List
            </h3>
            <div
                ref={gridRef}
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
                    visible.grid ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
                }`}
            >
                {packages.map((pkg) => (
                    <PriceCard key={pkg.id} package={pkg} />
                ))}
            </div>
        </section>
    );
}
