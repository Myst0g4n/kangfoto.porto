"use client";
import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

interface TypingProps {
    words: string[];
}

const Typing: React.FC<TypingProps> = ({ words }) => {
    const elRef = useRef<HTMLSpanElement>(null);
    const typedRef = useRef<Typed | null>(null);

    useEffect(() => {
        const options = {
            strings: words,
            typeSpeed: 70,
            backSpeed: 30,
            loop: true,
            cursorChar: "|",
        };

        if (elRef.current) {
            typedRef.current = new Typed(elRef.current, options);
        }

        return () => {
            typedRef.current?.destroy();
        };
    }, [words]);

    return (
        <span
            ref={elRef}
            className="whitespace-normal break-words inline-block max-w-full"
            style={{ whiteSpace: "pre-wrap" }}
        />
    );
};

export default Typing;