import { renderHookWithQueryClient } from '../../utils/renderHookWithQueryClient';
import { flushPromises } from '../../utils/flushPromises';
import { useBrandProducts, fetchBrandProducts } from '@/hooks/useBrandProducts';
import { getProductsByBrand } from '@/services/products';
import { mockProducts } from '../fixtures/products';

jest.mock('@/services/products');

describe('useBrandProducts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('returns empty array when brand is undefined', async () => {
        const { result, waitFor } = renderHookWithQueryClient(() =>
            useBrandProducts(undefined)
        );

        await waitFor(() => result.current.status === 'success');
        await flushPromises();

        expect(result.current.data ?? []).toEqual([]);
        expect(getProductsByBrand).not.toHaveBeenCalled();
    });

    test('fetches products when brand is provided', async () => {
        (getProductsByBrand as jest.Mock).mockResolvedValue(mockProducts);

        const { result, waitFor } = renderHookWithQueryClient(() =>
            useBrandProducts('samsung')
        );

        await waitFor(() => result.current.status === 'success');
        await flushPromises();

        expect(getProductsByBrand).toHaveBeenCalledWith('samsung');
        expect(result.current.data).toEqual(mockProducts);
    });

    test('handles API errors correctly', async () => {
        const error = new Error('API Error');
        (getProductsByBrand as jest.Mock).mockRejectedValue(error);

        const { result, waitFor } = renderHookWithQueryClient(() =>
            useBrandProducts('apple')
        );

        await waitFor(() => result.current.status === 'error');
        await flushPromises();

        expect(result.current.error).toEqual(error);
    });

    test('fetchBrandProducts returns empty array when no brand provided', async () => {
        const result = await fetchBrandProducts(undefined);
        expect(result).toEqual([]);
    });
});
