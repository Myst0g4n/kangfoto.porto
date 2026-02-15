import { useEffect, useState } from 'react';
import { getData, PricePackage } from '../utils/dataManager';

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
        try {
            // Ambil data langsung dari sistem manajemen data
            const data = getData.packages();
            setPackages(data);
        } catch (err) {
            setError('Failed to fetch packages');
            console.error('Error fetching packages:', err);

            // Set data default jika terjadi error
            setPackages([]);
        } finally {
            setLoading(false);
        }
    }, []);

    return { packages, loading, error };
};
