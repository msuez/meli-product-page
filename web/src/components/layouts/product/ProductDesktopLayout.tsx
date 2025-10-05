'use client';

import Link from 'next/link';
import SellerBox from '@/components/product/seller/SellerBox';
import ProductSpecs from '@/components/product/details/ProductSpecs';
import ProductGallery from '@/components/product/gallery/ProductGallery';
import ProductActions from '@/components/product/purchase/ProductActions';
import PaymentMethods from '@/components/product/purchase/PaymentMethods';
import ProductDescription from '@/components/product/details/ProductDescription';
import RelatedProductsList from '@/components/product/recommendations/RelatedProductsList';
import BrandProductsCarousel from '@/components/product/recommendations/BrandProductsCarousel';
import RelatedProductsCarousel from '@/components/product/recommendations/RelatedProductCarousel';
import ProductPurchaseOptions from '@/components/product/details/ProductPurchaseOptions';
import ProductQuickFeatures from '@/components/product/details/ProductQuickFeatures';
import ProductColor from '@/components/product/details/ProductColor';
import ProductPrice from '@/components/product/details/ProductPrice';
import ProductRating from '@/components/product/details/ProductRating';
import ProductBestSellerBadge from '@/components/product/details/ProductBestSellerBadge';
import ProductSellerInfo from '@/components/product/seller/ProductSellerInfo';
import ProductStatus from '@/components/product/details/ProductStatus';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { Product } from '@/types';

interface ProductDesktopLayoutProps {
    product: Product;
    relatedProducts: Product[];
    brandProducts: Product[];
}

export default function ProductDesktopLayout({
    product,
    relatedProducts,
    brandProducts,
}: ProductDesktopLayoutProps) {
    const filteredBrandProducts = brandProducts?.filter((p) => p.id !== product.id) || [];

    return (
        <div className="w-full mx-auto px-2 lg:px-6 py-6 bg-background-page">
            <div className="hidden md:block text-sm text-secondary mb-2">
                <span className="font-semibold">También puede interesarte:</span>{' '}
                funda samsung a54 - samsung galaxy - celulares - samsung s54
            </div>

            {/* Breadcrumb */}
            <div className="hidden md:flex justify-between items-center text-sm mb-6">
                <div className="flex items-center gap-1">
                    <Link href="/" className="text-primary hover:underline">
                        Volver al listado
                    </Link>
                    <span className="text-secondary">{'>'}</span>
                    <Link href="/" className="text-primary hover:underline">
                        Celulares y Telefonía
                    </Link>
                    <span className="text-secondary">{'>'}</span>
                    <Link href="/" className="text-primary hover:underline">
                        Celulares y Smartphones
                    </Link>
                    <span className="text-secondary">{'>'}</span>
                    <span className="text-primary">{product.brand}</span>
                </div>

                <div className="flex gap-4 text-primary">
                    <Link href="#" className="hover:underline">
                        Vender uno igual
                    </Link>
                    <span className="text-secondary">|</span>
                    <Link href="#" className="hover:underline">
                        Compartir
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6">
                <div className="grid grid-cols-12 gap-8">
                    <main className="col-span-12 lg:col-span-8">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-6">
                                <ProductGallery pictures={product.pictures} />
                            </div>

                            <div className="col-span-12 lg:col-span-6">
                                <div className="space-y-3 text-sm">
                                    <ProductSellerInfo
                                        sellerName={product.seller.name}
                                        sellerLogo={product.seller.logo}
                                    />

                                    <div className="flex items-center justify-between">
                                        <ProductStatus
                                            condition={product.condition}
                                            soldQuantity={product.soldQuantity}
                                        />
                                        <FavoriteButton />
                                    </div>

                                    {product.bestSeller && (
                                        <ProductBestSellerBadge rank={8} category="Celulares y Smartphones" />
                                    )}

                                    <h1
                                        data-testid="product-title"
                                        className="text-xl font-semibold text-foreground"
                                    >
                                        {product.title}
                                    </h1>

                                    <ProductRating rating={product.rating} reviews={product.reviewsCount} />

                                    <div data-testid="product-price">
                                        <ProductPrice
                                            price={product.price}
                                            originalPrice={product.originalPrice}
                                            discount={product.discount}
                                            installments={product.installments}
                                            promo={product.promo}
                                        />
                                    </div>

                                    {product.color && <ProductColor color={product.color} />}

                                    {product.attributesPreview.length > 0 && (
                                        <ProductQuickFeatures attributes={product.attributesPreview} />
                                    )}

                                    <ProductPurchaseOptions price={product.price} />
                                </div>
                            </div>
                        </div>

                        {relatedProducts && relatedProducts.length > 0 && (
                            <div className="mt-8">
                                <hr className="mb-6 border-border w-full" />
                                <div className="grid grid-cols-12">
                                    <div className="col-span-11">
                                        <RelatedProductsCarousel products={relatedProducts} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {filteredBrandProducts.length > 0 && (
                            <div className="mt-8">
                                <hr className="mb-6 border-border w-full" />
                                <div className="grid grid-cols-12">
                                    <div className="col-span-11">
                                        <BrandProductsCarousel
                                            products={filteredBrandProducts}
                                            brand={product.brand}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-8">
                            <hr className="mb-6 border-border" />
                            <ProductSpecs attributes={product.attributes} />
                        </div>

                        <div className="mt-8">
                            <hr className="mb-6 border-border" />
                            <ProductDescription description={product.description} />
                        </div>
                    </main>

                    <aside className="col-span-12 lg:col-span-4 space-y-6">
                        <ProductActions
                            stock={product.stock}
                            shipping={product.shipping}
                            seller={product.seller}
                        />
                        <SellerBox {...product.seller} />
                        <PaymentMethods methods={product.paymentMethods} />
                        <RelatedProductsList products={relatedProducts || []} />
                    </aside>
                </div>
            </div>
        </div>
    );
}
