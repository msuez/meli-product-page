import { renderHook, act } from '@testing-library/react';
import { useDevice } from '@/hooks/useDevice';

describe('useDevice', () => {
    beforeEach(() => {
        global.innerWidth = 1024;
    });

    it('detects mobile when width is below breakpoint', () => {
        global.innerWidth = 500;
        const { result } = renderHook(() => useDevice(896));
        act(() => window.dispatchEvent(new Event('resize')));
        expect(result.current.isMobile).toBe(true);
        expect(result.current.isDesktop).toBe(false);
    });

    it('detects desktop when width is above breakpoint', () => {
        global.innerWidth = 1200;
        const { result } = renderHook(() => useDevice(896));
        act(() => window.dispatchEvent(new Event('resize')));
        expect(result.current.isMobile).toBe(false);
        expect(result.current.isDesktop).toBe(true);
    });

    it('cleans up listeners and timeouts on unmount', () => {
        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
        const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
        const { unmount } = renderHook(() => useDevice(896));
        unmount();
        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledWith('orientationchange', expect.any(Function));
        expect(clearTimeoutSpy).toHaveBeenCalled();
        removeEventListenerSpy.mockRestore();
        clearTimeoutSpy.mockRestore();
    });

    it('returns default values when executed in server-like environment', () => {
        const original = global.window;
        (global as any).window = undefined;

        const { result } = renderHook(() => {
            return require('@/hooks/useDevice').useDevice(896);
        });

        expect(result.current.isReady).toBe(true);
        expect(result.current.isMobile).toBe(false);
        expect(result.current.isDesktop).toBe(true);

        global.window = original;
    });

});
