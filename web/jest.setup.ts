import '@testing-library/jest-dom';
import { QueryClient } from '@tanstack/react-query';

const originalError = console.error;
beforeAll(() => {
    console.error = (...args: any[]) => {
        const message = args[0];
        if (
            typeof message === 'string' &&
            (
                message.includes('React Query') ||
                message.includes('act(...)') ||
                message.includes('ReactDOM.render is no longer supported') ||
                message.includes('Warning:')
            )
        ) {
            return;
        }
        originalError(...args);
    };
});

if (typeof global.setImmediate === 'undefined') {
    (global as any).setImmediate = (callback: (...args: any[]) => void, ...args: any[]) => {
        return setTimeout(callback, 0, ...args);
    };
}

export const createSilentQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false,
                staleTime: 0,
            },
        },
    });
