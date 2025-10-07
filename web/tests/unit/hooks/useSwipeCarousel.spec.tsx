import { renderHook, act } from '@testing-library/react';
import { useSwipeCarousel } from '@/hooks/useSwipeCarousel';

describe('useSwipeCarousel', () => {
    it('avanza al siguiente slide cuando se hace swipe a la izquierda', () => {
        const { result } = renderHook(() => useSwipeCarousel({ total: 3 }));
        const startEvent = { touches: [{ clientX: 200 }] } as any;
        const endEvent = { changedTouches: [{ clientX: 100 }] } as any;

        act(() => {
            result.current.handleTouchStart(startEvent);
            result.current.handleTouchEnd(endEvent);
        });

        expect(result.current.current).toBe(1);
    });

    it('retrocede al slide anterior cuando se hace swipe a la derecha', () => {
        const { result } = renderHook(() => useSwipeCarousel({ total: 3 }));

        act(() => {
            result.current.setCurrent(1);
        });

        const startEvent = { touches: [{ clientX: 100 }] } as any;
        const endEvent = { changedTouches: [{ clientX: 200 }] } as any;

        act(() => {
            result.current.handleTouchStart(startEvent);
            result.current.handleTouchEnd(endEvent);
        });

        expect(result.current.current).toBe(0);
    });

    it('no cambia de slide si el swipe no supera el threshold', () => {
        const { result } = renderHook(() => useSwipeCarousel({ total: 3, threshold: 80 }));
        const startEvent = { touches: [{ clientX: 200 }] } as any;
        const endEvent = { changedTouches: [{ clientX: 150 }] } as any;

        act(() => {
            result.current.handleTouchStart(startEvent);
            result.current.handleTouchEnd(endEvent);
        });

        expect(result.current.current).toBe(0);
    });

    it('no avanza más allá del último slide', () => {
        const { result } = renderHook(() => useSwipeCarousel({ total: 2 }));

        act(() => {
            result.current.setCurrent(1);
        });

        const startEvent = { touches: [{ clientX: 200 }] } as any;
        const endEvent = { changedTouches: [{ clientX: 100 }] } as any;

        act(() => {
            result.current.handleTouchStart(startEvent);
            result.current.handleTouchEnd(endEvent);
        });

        expect(result.current.current).toBe(1);
    });

    it('no retrocede más allá del primer slide', () => {
        const { result } = renderHook(() => useSwipeCarousel({ total: 3 }));
        const startEvent = { touches: [{ clientX: 100 }] } as any;
        const endEvent = { changedTouches: [{ clientX: 200 }] } as any;

        act(() => {
            result.current.handleTouchStart(startEvent);
            result.current.handleTouchEnd(endEvent);
        });

        expect(result.current.current).toBe(0);
    });

    it('no hace nada si startX es null', () => {
        const { result } = renderHook(() => useSwipeCarousel({ total: 3 }));
        const endEvent = { changedTouches: [{ clientX: 100 }] } as any;

        act(() => {
            result.current.handleTouchEnd(endEvent);
        });

        expect(result.current.current).toBe(0);
    });
});
