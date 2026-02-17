'use client';

import { GalleryItem as ProjectImage } from '@/lib/utils/dataManager';

interface ProjectGalleryCardProps {
    image: ProjectImage;
    onImageClick: (image: ProjectImage) => void;
}

export function ProjectGalleryCard({ image, onImageClick }: ProjectGalleryCardProps) {

    return (
        <div
            onClick={() => onImageClick(image)}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-500/20 via-gray-400/20 to-gray-500/20 aspect-[4/3] cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
            {/* Thumbnail Image */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src={image.thumbnail}
                    alt={image.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNmY2ZjZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=`;
                    }}
                />
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 group-hover:from-black/50 transition-colors duration-300"></div>

            {/* Info on hover */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center px-4">
                    <h3 className="text-white text-lg font-bold mb-1 line-clamp-1">{image.name}</h3>
                    <p className="text-gray-200 text-sm mb-3 line-clamp-2">
                        {image.description}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold">
                            {image.slug}
                        </span>
                        <span className="text-white text-sm font-medium flex items-center gap-1">
                            View
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>

            {/* Click icon indicator */}
            <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
        </div>
    );
}
