'use client';

import { GalleryItem as ProjectImage } from '@/lib/hooks/useProjectGallery';

interface ProjectGalleryCardLandingProps {
    image: ProjectImage;
    onImageClick: (image: ProjectImage) => void;
}

export function ProjectGalleryCardLanding({ image, onImageClick }: ProjectGalleryCardLandingProps) {

    return (
        <div
            onClick={() => onImageClick(image)}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-500/30 via-gray-400/30 to-gray-500/30 aspect-[3/4] cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
        >
            {/* Thumbnail Image */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src={image.thumbnail}
                    alt={image.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNmY2ZjZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=`;
                    }}
                />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 group-hover:from-black/80 transition-colors duration-500"></div>

            {/* Info on hover */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="text-center px-6">
                    <h3 className="text-white text-xl font-bold mb-2 line-clamp-1">{image.name}</h3>
                    <p className="text-gray-200 text-sm mb-4 line-clamp-2">
                        {image.description}
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <span className="px-4 py-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-full text-sm font-semibold shadow-lg">
                            {image.slug}
                        </span>
                        <span className="text-white text-base font-medium flex items-center gap-2 animate-pulse">
                            Lihat Detail
                            <svg 
                                className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>

            {/* Corner badge */}
            <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/30">
                    NEW
                </span>
            </div>

            {/* Hover effect elements */}
            <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-xl transition-all duration-500 pointer-events-none"></div>
        </div>
    );
}