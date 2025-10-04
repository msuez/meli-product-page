'use client';

import { useState, useRef } from 'react';

interface UseSwipeCarouselOptions {
    total: number;
    threshold?: number;
}

export function useSwipeCarousel({ total, threshold = 50 }: UseSwipeCarouselOptions) {
    const [current, setCurrent] = useState(0);
    const startX = useRef<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        startX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (startX.current === null) return;

        const endX = e.changedTouches[0].clientX;
        const diff = startX.current - endX;

        if (Math.abs(diff) > threshold) {

            if (diff > 0 && current < total - 1) {
                setCurrent((prev) => prev + 1);
            }

            else if (diff < 0 && current > 0) {
                setCurrent((prev) => prev - 1);
            }
        }

        startX.current = null;
    };

    return { current, setCurrent, handleTouchStart, handleTouchEnd };
}
