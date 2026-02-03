'use client';

import { useScrollAnimation } from '@/lib/hooks';
import Typing from './feature/typed';

export default function Hero() {
    const { visible, imageRef, textRef } = useScrollAnimation();

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Image - appears first on mobile, second on desktop */}
                <div
                    ref={imageRef}
                    className={`order-first md:order-last flex justify-center floating transition-all duration-1000 ${
                        visible.image ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <img
                        src="/img/PictureHero.jpeg"
                        alt="Photography"
                        className="w-full max-w-md rounded-lg shadow-lg"
                    />
                </div>

                {/* Text content */}
                <div
                    ref={textRef}
                    className={`text-center md:text-left order-last md:order-first transition-all duration-1000 ${
                        visible.text ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6">KANG FOTO</h1>
                    <div className="mb-8 max-w-full">
                        <small className="brand-alt text-lg sm:text-xl text-gray-100 block max-w-full">
                            <Typing words={["Professional Photography Moments", "Capturing Life's Best Moments", "Creating Beautiful Memories"]} />
                        </small>
                    </div>
                    <p className="text-gray-400 mt-4 text-base sm:text-lg md:text-xl text-justify leading-relaxed">
                        Rencakan hari pernikahan Anda dengan sentuhan profesional dari KangFoto. Kami hadir untuk mengabadikan momen-momen berharga Anda dengan kualitas terbaik dan layanan yang tak tertandingi. Biarkan kami membantu Anda menciptakan kenangan yang akan dikenang sepanjang masa.
                    </p>
                </div>
            </div>
        </section>
    );
}