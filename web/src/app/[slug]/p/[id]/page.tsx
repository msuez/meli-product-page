'use client';

import { use } from 'react';
import { useProduct } from '@/hooks/useProduct';
import { useBrandProducts } from '@/hooks/useBrandProducts';
import { useRelatedProducts } from '@/hooks/useRelatedProduct';

import ProductDesktopLayout from '@/components/layouts/product/ProductDesktopLayout';
import ProductMobileLayout from '@/components/layouts/product/ProductMobileLayout';
import { useDevice } from '@/hooks/useDevice';

export default function ProductPage({
    params,
}: {
    params: Promise<{ slug: string; id: string }>;
}) {
    const { id } = use(params);

    const { data: product, isLoading, error } = useProduct(id);
    const { data: relatedProducts } = useRelatedProducts(id);
    const { data: brandProducts } = useBrandProducts(product?.brand);

    const { isMobile } = useDevice();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading product</p>;
    if (!product) return <p>No product found</p>;

    return isMobile ? (
        <ProductMobileLayout
            product={product}
            relatedProducts={relatedProducts || []}
            brandProducts={brandProducts || []}
        />
    ) : (
        <ProductDesktopLayout
            product={product}
            relatedProducts={relatedProducts || []}
            brandProducts={brandProducts || []}
        />
    );
}
