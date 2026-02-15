import { useEffect, useState } from 'react';

export interface PricePackage {
    id: number;
    title: string;
    description: string;
    price: string;
    features: string[];
    note: string;
}

export const usePricePackages = () => {
    const [packages, setPackages] = useState<PricePackage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch('/data/packages.json');

                if (response.ok) {
                    const data: PricePackage[] = await response.json();
                    setPackages(data);
                } else {
                    throw new Error('Failed to fetch packages');
                }
            } catch (err) {
                setError('Failed to fetch packages');
                console.error('Error fetching packages:', err);
                
                // Set data default jika terjadi error
                setPackages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    return { packages, loading, error };
};
