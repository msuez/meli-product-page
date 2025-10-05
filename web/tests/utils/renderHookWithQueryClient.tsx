import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';

function createTestQueryClient() {
    const client = new QueryClient({
        queryCache: new QueryCache({
            onError: () => { },
        }),
        defaultOptions: {
            queries: {
                retry: false,
                staleTime: 0,
                gcTime: Infinity,
            },
        },
    });
    return client;
}

export async function waitForQueryIdle(client: QueryClient) {
    while (client.isFetching()) {
        await new Promise((r) => setTimeout(r, 0));
    }
}

export function renderHookWithQueryClient<T>(hook: () => T) {
    const client = createTestQueryClient();

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );

    const result = renderHook(hook, { wrapper });

    return {
        ...result,
        client,
        waitFor: async (predicate: () => boolean | void) => {
            await waitFor(predicate, { timeout: 3000 });
            await waitForQueryIdle(client);
        },
    };
}
