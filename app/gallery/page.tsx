'use client';

import { useState, useMemo } from 'react';
import { useScrollAnimation, useProjectGallery } from '@/lib/hooks';
import { GalleryItem as ProjectImage } from '@/lib/hooks/useProjectGallery';
import { ProjectGalleryCard } from '@/app/components/ProjectGalleryCard';
import { LightboxGallery } from '@/app/components/LightboxGallery';
import Link from 'next/link';

export default function GalleryPage() {
    const { visible, titleRef, gridRef } = useScrollAnimation();
    const { images, loading, error } = useProjectGallery();
    const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);

    // Gunakan useMemo untuk menghitung jumlah kategori agar tidak dihitung ulang setiap render
    const categoryCount = useMemo(() => {
        return new Set(images.map(img => img.slug)).size;
    }, [images]);

    return (
        <main className="min-h-screen bg-black">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
                <Link
                    href="/#portfolio"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Kembali ke beranda
                </Link>

                <h1
                    ref={titleRef}
                    className={`text-5xl font-bold text-white mb-4 transition-all duration-1000 ${
                        visible.title ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
                    }`}
                >
                    Galeri Lengkap
                </h1>
                <p className="text-gray-400 text-lg mb-12">
                    Koleksi lengkap semua proyek fotografi kami. Klik gambar untuk melihat resolusi tinggi.
                </p>
            </div>

            {/* Gallery Grid */}
            {!loading && !error && images.length === 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="text-gray-400 text-center py-20">No gallery items to display</div>
                </section>
            )}

            {loading && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="text-white text-center py-20">Loading gallery...</div>
                </section>
            )}

            {error && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="text-red-400 text-center py-20">{error}</div>
                </section>
            )}

            {!loading && !error && images.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div
                        ref={gridRef}
                        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 transition-all duration-1000 ${
                            visible.grid ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
                        }`}
                    >
                        {images.map((image) => (
                            <ProjectGalleryCard
                                key={image.id}
                                image={image}
                                onImageClick={setSelectedImage}
                            />
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-16 pt-12 border-t border-gray-700">
                        <div className="grid grid-cols-3 gap-8 text-center">
                            <div>
                                <p className="text-3xl font-bold text-blue-400">{images.length}+</p>
                                <p className="text-gray-400 mt-2">Foto Profesional</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-blue-400">
                                    {categoryCount}
                                </p>
                                <p className="text-gray-400 mt-2">Kategori</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-blue-400">4K+</p>
                                <p className="text-gray-400 mt-2">Resolusi HD</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Lightbox */}
            <LightboxGallery
                image={selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </main>
    );
}
