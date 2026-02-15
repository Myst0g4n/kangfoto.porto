'use client';

import { ProjectImage } from '@/lib/hooks';
import { useEffect } from 'react';

interface LightboxGalleryProps {
    image: ProjectImage | null;
    onClose: () => void;
}

export function LightboxGallery({ image, onClose }: LightboxGalleryProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (image) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [image, onClose]);

    if (!image) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
            onClick={onClose}
        >
            {/* Main content */}
            <div
                className="relative max-w-4xl w-full mx-4 animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image container with scrollable area */}
                <div 
                    className="relative bg-black rounded-lg overflow-y-auto max-h-[90vh]"
                    style={{ 
                        msOverflowStyle: 'auto', 
                        scrollbarWidth: 'thin' 
                    }}
                >
                    <img
                        src={image.fullImage}
                        alt={image.name}
                        className="w-full object-contain block"
                        style={{ maxHeight: 'calc(90vh - 100px)' }} // Memberi ruang untuk info overlay
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNmY2ZjZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=`;
                        }}
                    />

                    {/* Info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{image.name}</h3>
                        <p className="text-gray-300">{image.description}</p>
                        <span className="inline-block mt-3 px-3 py-1 bg-blue-600 rounded-full text-sm">
                            {image.slug}
                        </span>
                    </div>
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 transition-colors"
                    aria-label="Close"
                >
                    ✕
                </button>

                {/* Navigation hint */}
                <div className="text-center text-gray-400 text-sm mt-4">
                    Press <kbd className="px-2 py-1 bg-gray-700 rounded">ESC</kbd> to close
                </div>
            </div>
        </div>
    );
}
