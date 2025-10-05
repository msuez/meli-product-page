'use client';

import { useEffect, useState } from 'react';

export function useDevice(breakpoint: number = 896) {
    const isServer = typeof window === 'undefined';
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isReady, setIsReady] = useState<boolean>(isServer ? true : false);

    useEffect(() => {
        if (isServer) return;

        const checkDevice = () => window.innerWidth < breakpoint;
        setIsMobile(checkDevice());
        setIsReady(true);

        const handleResize = () => {
            setIsMobile(checkDevice());
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        const safariFix = setTimeout(() => {
            setIsMobile(checkDevice());
            setIsReady(true);
        }, 300);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
            clearTimeout(safariFix);
        };
    }, [breakpoint]);

    return {
        isMobile,
        isDesktop: !isMobile,
        isReady,
    };
}
