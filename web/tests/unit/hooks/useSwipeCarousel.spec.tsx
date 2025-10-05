import { renderHook, act } from '@testing-library/react';
import { useSwipeCarousel } from '@/hooks/useSwipeCarousel';

test('avanza al siguiente slide cuando se hace swipe a la izquierda', () => {
    const { result } = renderHook(() => useSwipeCarousel({ total: 3 }));
    const startEvent = { touches: [{ clientX: 200 }] } as any;
    const endEvent = { changedTouches: [{ clientX: 100 }] } as any;

    act(() => {
        result.current.handleTouchStart(startEvent);
        result.current.handleTouchEnd(endEvent);
    });

    expect(result.current.current).toBe(1);
});
