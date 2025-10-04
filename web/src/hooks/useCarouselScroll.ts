'use client';

import { useRef, useState, useEffect } from 'react';

export function useCarouselScroll() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollButtons = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            scrollRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        updateScrollButtons();
        const container = scrollRef.current;
        if (container) {
            container.addEventListener('scroll', updateScrollButtons);
            window.addEventListener('resize', updateScrollButtons);
        }
        return () => {
            if (container) container.removeEventListener('scroll', updateScrollButtons);
            window.removeEventListener('resize', updateScrollButtons);
        };
    }, []);

    return { scrollRef, scroll, canScrollLeft, canScrollRight };
}
