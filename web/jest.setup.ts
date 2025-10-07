import "@testing-library/jest-dom";
import { QueryClient } from "@tanstack/react-query";

const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
    console.error = (...args: any[]) => {
        const message = args[0];

        if (
            typeof message === "string" &&
            (
                message.includes("React Query") ||
                message.includes("act(...)") ||
                message.includes("ReactDOM.render is no longer supported") ||
                message.includes("Warning:")
            )
        ) {
            return;
        }

        originalError(...args);
    };

    console.warn = (...args: any[]) => {
        const message = args[0];

        if (
            typeof message === "string" &&
            (
                message.includes("punycode") ||
                message.includes("DeprecationWarning") ||
                message.includes("ReactDOM.render is no longer supported")
            )
        ) {
            return;
        }

        originalWarn(...args);
    };
});

if (typeof global.setImmediate === "undefined") {
    (global as any).setImmediate = (callback: (...args: any[]) => void, ...args: any[]) =>
        setTimeout(callback, 0, ...args);
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
