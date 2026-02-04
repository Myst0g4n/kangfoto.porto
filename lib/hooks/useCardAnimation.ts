import { useEffect, useRef, useState } from 'react';

interface CardAnimationProps {
    delay?: number;
    threshold?: number;
    rootMargin?: string;
}

export const useCardAnimation = ({ delay = 0, threshold = 0.2, rootMargin = '0px 0px -100px 0px' }: CardAnimationProps = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observerOptions = {
            threshold,
            rootMargin,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Gunakan setTimeout untuk memberikan delay jika diperlukan
                    const timer = setTimeout(() => {
                        setIsVisible(true);
                    }, delay);

                    // Hapus observer setelah card muncul
                    observer.unobserve(entry.target);

                    return () => clearTimeout(timer);
                }
            });
        }, observerOptions);

        const currentElement = elementRef.current;

        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [delay, threshold, rootMargin]);

    return { isVisible, elementRef };
};