import { useEffect, useRef, useState } from 'react';

interface VisibleState {
    title?: boolean;
    grid?: boolean;
    content?: boolean;
    stats?: boolean;
    members?: boolean;
    image?: boolean;
    text?: boolean;
}

export const useScrollAnimation = () => {
    const [visible, setVisible] = useState<VisibleState>({
        title: false,
        grid: false,
        content: false,
        stats: false,
        members: false,
        image: false,
        text: false,
    });

    const titleRef = useRef(null);
    const gridRef = useRef(null);
    const contentRef = useRef(null);
    const statsRef = useRef(null);
    const membersRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px',
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target === titleRef.current) {
                        setVisible((prev) => ({ ...prev, title: true }));
                    } else if (entry.target === gridRef.current) {
                        setVisible((prev) => ({ ...prev, grid: true }));
                    } else if (entry.target === contentRef.current) {
                        setVisible((prev) => ({ ...prev, content: true }));
                    } else if (entry.target === statsRef.current) {
                        setVisible((prev) => ({ ...prev, stats: true }));
                    } else if (entry.target === membersRef.current) {
                        setVisible((prev) => ({ ...prev, members: true }));
                    } else if (entry.target === imageRef.current) {
                        setVisible((prev) => ({ ...prev, image: true }));
                    } else if (entry.target === textRef.current) {
                        setVisible((prev) => ({ ...prev, text: true }));
                    }
                }
            });
        }, observerOptions);

        const refs = [titleRef, gridRef, contentRef, statsRef, membersRef, imageRef, textRef];
        refs.forEach((ref) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return { visible, titleRef, gridRef, contentRef, statsRef, membersRef, imageRef, textRef };
};
