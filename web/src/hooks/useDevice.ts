'use client';

import { useEffect, useState } from 'react';

export function useDevice(breakpoint: number = 896) {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const checkDevice = () => window.innerWidth < breakpoint;
        setIsMobile(checkDevice());

        const handleResize = () => setIsMobile(checkDevice());
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, [breakpoint]);

    return {
        isMobile,
        isDesktop: isMobile === null ? null : !isMobile,
    };
}
