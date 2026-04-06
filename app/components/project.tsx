'use client';

import { useState } from 'react';
import { useScrollAnimation, useProjectGallery } from '@/lib/hooks';
import { GalleryItem as ProjectImage } from '@/lib/hooks/useProjectGallery';
import { ProjectGalleryCardLanding } from './ProjectGalleryCardLanding';
import { LightboxGallery } from './LightboxGallery';
import Link from 'next/link';

export default function Project() {
    const { visible, titleRef, gridRef } = useScrollAnimation();
    const { images } = useProjectGallery();
    const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);

    // Ambil 5 gambar pertama sebagai preview
    const previewImages = images.slice(0, 5);

    return (
        <section id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h3
                ref={titleRef}
                className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 mb-12 text-center transition-all duration-1000 ${
                    visible.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                Our Works
            </h3>

            {/* Gallery Grid */}
            <div
                ref={gridRef}
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 transition-all duration-1000 ${
                    visible.grid ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                {previewImages.map((image) => (
                    <ProjectGalleryCardLanding
                        key={image.id}
                        image={image}
                        onImageClick={setSelectedImage}
                    />
                ))}
            </div>

            {/* See More Button */}
            <div className="flex justify-center mt-12">
                <Link
                    href="/gallery"
                    className="group relative px-8 py-3 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-gray-400/50 transition-all duration-300 overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Lihat Galeri Lengkap
                        <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
            </div>

            {/* Lightbox */}
            <LightboxGallery
                image={selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </section>
    );
}