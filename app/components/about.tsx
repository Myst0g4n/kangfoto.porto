'use client';

import { useScrollAnimation } from '@/lib/hooks';
import { AboutStats } from './AboutStats';

const ABOUT_STATS = [
    { value: '500+', label: 'Proyek Selesai' },
    { value: '100%', label: 'Kepuasan Klien' },
    { value: '5+', label: 'Tahun Pengalaman' },
];

export default function About() {
    const { visible, titleRef, contentRef, statsRef } = useScrollAnimation();

    return (
        <section className="py-16 px-4 bg-gradient-to-br from-pink-900/20 to-pink-800/20" id="about">
            <div className="max-w-4xl mx-auto">
                <h3
                    ref={titleRef}
                    className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 mb-12 text-center transition-all duration-1000 ${
                        visible.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    About Us
                </h3>

                <div
                    ref={contentRef}
                    className={`grid md:grid-cols-2 gap-8 items-center text-justify transition-all duration-1000 ${
                        visible.content ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <div className="bg-gradient-to-br from-pink-500 to-pink-700 h-64 rounded-lg shadow-lg">
                        <img src="/img/AboutPhoto.jpeg" alt="KangFoto Team" className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div>
                        <p className="text-lg text-pink-100 mb-4">
                            KangFoto adalah studio fotografi profesional yang berdedikasi untuk menangkap momen berharga Anda dengan kualitas terbaik.
                        </p>
                        <p className="text-pink-200 mb-6">
                            Dengan pengalaman yang luas di industri fotografi, kami memahami setiap detail penting untuk menciptakan karya yang tak terlupakan.
                        </p>
                    </div>
                </div>

                <div
                    ref={statsRef}
                    className={`transition-all duration-1000 ${
                        visible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <AboutStats stats={ABOUT_STATS} />
                </div>
            </div>
        </section>
    );
}