
import { renderHook, act } from '@testing-library/react';
import { useDevice } from '@/hooks/useDevice';

test('detects mobile vs desktop correctly', () => {
    global.innerWidth = 500;
    const { result } = renderHook(() => useDevice(896));
    act(() => window.dispatchEvent(new Event('resize')));
    expect(result.current.isMobile).toBe(true);
});
