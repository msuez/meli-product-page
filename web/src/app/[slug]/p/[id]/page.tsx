'use client';

import { use } from 'react';
import { useProduct } from '@/hooks/useProduct';
import { useBrandProducts } from '@/hooks/useBrandProducts';
import { useRelatedProducts } from '@/hooks/useRelatedProduct';
import ProductDesktopLayout from '@/components/layouts/product/ProductDesktopLayout';
import ProductMobileLayout from '@/components/layouts/product/ProductMobileLayout';
import { useDevice } from '@/hooks/useDevice';
import ErrorProduct from '@/components/product/errors/ErrorProduct';
import NotFoundProduct from '@/components/product/errors/NotFoundProduct';
import ProductSkeleton from '@/components/product/skeleton/ProductSkeleton';

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

    if (productLoading || !isReady) {
        return <ProductSkeleton />;
    }

    if (productError) {
        return <ErrorProduct />;
    }

    if (!product) {
        return <NotFoundProduct />;
    }

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
