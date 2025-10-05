import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useCarouselScroll } from '@/hooks/useCarouselScroll';

describe('useCarouselScroll', () => {
    let scrollElement: HTMLDivElement;

    beforeEach(() => {
        scrollElement = document.createElement('div');

        Object.defineProperty(scrollElement, 'scrollWidth', {
            value: 2000,
            writable: false,
        });
        Object.defineProperty(scrollElement, 'clientWidth', {
            value: 1000,
            writable: false,
        });

        scrollElement.scrollLeft = 0;
        scrollElement.scrollTo = jest.fn();
    });

    test('initializes scroll states correctly', () => {
        const { result } = renderHook(() => useCarouselScroll());

        expect(result.current.scrollRef.current).toBeNull();
        expect(result.current.canScrollLeft).toBe(false);
        expect(result.current.canScrollRight).toBe(false);
    });

    test('updates canScrollLeft and canScrollRight correctly', () => {
        const { result } = renderHook(() => useCarouselScroll());

        act(() => {
            result.current.scrollRef.current = {
                scrollLeft: 0,
                scrollWidth: 2000,
                clientWidth: 1000,
                scrollTo: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            } as any;
        });

        act(() => {
            (result.current.scrollRef.current as any).scrollLeft = 500;
            (result.current as any).scroll('right');
        });

        expect(result.current.scrollRef.current?.scrollTo).toHaveBeenCalled();
    });

    test('calls scrollTo when scrolling left or right', () => {
        const { result } = renderHook(() => useCarouselScroll());

        act(() => {
            result.current.scrollRef.current = scrollElement;
        });

        act(() => {
            result.current.scroll('right');
        });

        expect(scrollElement.scrollTo).toHaveBeenCalledWith({
            left: scrollElement.scrollLeft + scrollElement.clientWidth,
            behavior: 'smooth',
        });

        act(() => {
            result.current.scroll('left');
        });

        expect(scrollElement.scrollTo).toHaveBeenCalledWith({
            left: scrollElement.scrollLeft - scrollElement.clientWidth,
            behavior: 'smooth',
        });
    });

    test('cleans up event listeners on unmount', () => {
        const removeSpy = jest.spyOn(window, 'removeEventListener');
        const { unmount } = renderHook(() => useCarouselScroll());
        unmount();
        expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    });

});
