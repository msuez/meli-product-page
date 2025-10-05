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
    const {
        data: product,
        isLoading: productLoading,
        error: productError,
    } = useProduct(id);
    const { data: relatedProducts } = useRelatedProducts(id);
    const { data: brandProducts } = useBrandProducts(product?.brand);
    const { isMobile, isReady } = useDevice();

    if (productLoading || !isReady)
        return (
            <p
                data-testid="loading-state"
                className="text-center text-muted-foreground mt-8"
            >
                Loading product details...
            </p>
        );

    if (productError)
        return (
            <p
                data-testid="error-state"
                className="text-center text-destructive mt-8"
            >
                Error loading product.
            </p>
        );

    if (!product)
        return (
            <p
                data-testid="not-found-state"
                className="text-center text-muted-foreground mt-8"
            >
                No product found.
            </p>
        );

    const safeRelated = relatedProducts || [];
    const safeBrand = brandProducts || [];

    return isMobile ? (
        <ProductMobileLayout
            product={product}
            relatedProducts={safeRelated}
            brandProducts={safeBrand}
        />
    ) : (
        <ProductDesktopLayout
            product={product}
            relatedProducts={safeRelated}
            brandProducts={safeBrand}
        />
    );
}
