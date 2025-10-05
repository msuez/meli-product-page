import { renderHookWithQueryClient } from '../../utils/renderHookWithQueryClient';
import { flushPromises } from '../../utils/flushPromises';
import { useRelatedProducts } from '@/hooks/useRelatedProduct';
import { getRelatedProducts } from '@/services/products';
import { mockProducts } from '../fixtures/products';

jest.mock('@/services/products');

describe('useRelatedProducts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('fetches related products successfully', async () => {
        (getRelatedProducts as jest.Mock).mockResolvedValue(mockProducts);

        const { result, waitFor } = renderHookWithQueryClient(() =>
            useRelatedProducts('1')
        );

        await waitFor(() => result.current.status === 'success');
        await flushPromises();

        expect(getRelatedProducts).toHaveBeenCalledWith('1');
        expect(result.current.data).toEqual(mockProducts);
    });

    test('handles API errors correctly', async () => {
        const error = new Error('Failed to fetch related');
        (getRelatedProducts as jest.Mock).mockRejectedValue(error);

        const { result, waitFor } = renderHookWithQueryClient(() =>
            useRelatedProducts('1')
        );

        await waitFor(() => result.current.status === 'error');
        await flushPromises();

        expect(result.current.error).toEqual(error);
    });
});
