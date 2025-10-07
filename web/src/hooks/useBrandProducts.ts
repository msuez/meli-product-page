'use client';

import { useQuery } from '@tanstack/react-query';
import { getProductsByBrand } from '@/services/products';
import { Product } from '@/types/product';

export const fetchBrandProducts = (brand?: string) => {
    if (!brand) return Promise.resolve([]);
    return getProductsByBrand(brand);
};

export function useBrandProducts(brand?: string) {
    return useQuery<Product[], Error>({
        queryKey: ['brandProducts', brand],
        queryFn: () => fetchBrandProducts(brand),
        enabled: !!brand,
        staleTime: 1000 * 60 * 5,
    });
}