import { useProduct } from '@/hooks/useProduct';
import { getProductById } from '@/services/products';
import { renderHookWithQueryClient } from '../../utils/renderHookWithQueryClient';

jest.mock('@/services/products');

test('fetches product data successfully', async () => {
    (getProductById as jest.Mock).mockResolvedValue({ id: '1', title: 'Test Product' });

    const { result, waitFor } = renderHookWithQueryClient(() => useProduct('1'));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ id: '1', title: 'Test Product' });
});
