import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';

export interface PricePackage {
    id: number;
    title: string;
    description: string;
    price: string;
    features: string[];
    note: string;
}

export interface ApiPackageResponse {
    data: Array<{
        id: number;
        documentId: string;
        name: string;
        slug: string;
        description: string;
        feature: string;
        price: string; // price is stored as string in the API
        is_active: boolean;
        note: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    }>;
}

export const usePricePackages = () => {
    const [packages, setPackages] = useState<PricePackage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await apiClient.get<ApiPackageResponse>('/api/packages');

                if (response.success && response.data && Array.isArray(response.data)) {
                    const transformedPackages = response.data.map(item => {
                        // Split the feature string by commas or other delimiters to create an array
                        // The feature field contains a long string with multiple features separated by commas/hyphens
                        let featuresArray: string[] = [];

                        if (item.feature) {
                            // Split by hyphens and clean up the resulting array
                            // Also handle possible newline characters and extra spaces
                            featuresArray = item.feature
                                .split(/[-\n\r]/) // Split by hyphens or newlines
                                .map(feature => feature.trim())
                                .filter(feature => feature.length > 0); // Remove empty strings
                        }

                        const priceNumber = parseInt(item.price);

                        return {
                            id: item.id,
                            title: item.name, // Map 'name' from API to 'title'
                            description: item.description,
                            price: `Rp ${priceNumber.toLocaleString()}`, // Convert string price to number and format as Indonesian Rupiah
                            features: featuresArray,
                            note: item.note
                        };
                    });

                    setPackages(transformedPackages);
                } else {
                    console.error('API response error:', response);
                }
            } catch (err) {
                setError('Failed to fetch packages');
                console.error('Error fetching packages:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    return { packages, loading, error };
};
