'use client';

import ProductBestSellerBadge from "@/components/product/details/ProductBestSellerBadge";
import ProductDescription from "@/components/product/details/ProductDescription";
import ProductPrice from "@/components/product/details/ProductPrice";
import ProductQuickFeatures from "@/components/product/details/ProductQuickFeatures";
import ProductRating from "@/components/product/details/ProductRating";
import ProductSpecs from "@/components/product/details/ProductSpecs";
import ProductStatus from "@/components/product/details/ProductStatus";
import ProductGalleryCarousel from "@/components/product/gallery/ProductGalleryCarousel";
import PaymentMethods from "@/components/product/purchase/PaymentMethods";
import ProductActions from "@/components/product/purchase/ProductActions";
import BrandProductsCarousel from "@/components/product/recommendations/BrandProductsCarousel";
import RelatedProductsCarousel from "@/components/product/recommendations/RelatedProductCarousel";
import SellerBox from "@/components/product/seller/SellerBox";
import { Product } from "@/types";

interface ProductMobileLayoutProps {
    product: Product;
    relatedProducts: Product[];
    brandProducts: Product[];
}

export default function ProductMobileLayout({
    product,
    relatedProducts,
    brandProducts,
}: ProductMobileLayoutProps) {
    const filteredBrandProducts = brandProducts?.filter((p) => p.id !== product.id) || [];

    return (
        <section className="px-4 pt-4 pb-8 space-y-6 bg-white">
            <div className="flex items-center justify-between mb-1.5">
                <ProductStatus
                    condition={product.condition}
                    soldQuantity={product.soldQuantity}
                />
                <ProductRating
                    rating={product.rating}
                    reviews={product.reviewsCount}
                />
            </div>
            {product.bestSeller && (
                <div className="mb-1 scale-90 md:scale-100 origin-left leading-none">
                    <ProductBestSellerBadge
                        rank={8}
                        category="Celulares y Smartphones"
                    />
                </div>
            )}
            <h1 className="text-base font-semibold text-foreground leading-snug mb-3">
                {product.title}
            </h1>
            <div className="col-span-12 lg:col-span-6 mb-4">
                <ProductGalleryCarousel pictures={product.pictures} />
            </div>
            <div className="mb-4">
                <ProductPrice
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                    installments={product.installments}
                    promo={product.promo}
                />
            </div>
            <div className="mb-6">
                <ProductActions
                    stock={product.stock}
                    shipping={product.shipping}
                    seller={product.seller}
                />
            </div>
            {product.attributesPreview.length > 0 && (
                <div className="mb-6">
                    <ProductQuickFeatures attributes={product.attributesPreview} />
                </div>
            )}
            <div className="mb-6 mt-6">
                <ProductSpecs attributes={product.attributes} />
            </div>
            {relatedProducts && relatedProducts.length > 0 && (
                <div className="mt-8 mb-6">
                    <hr className="mb-6 border-border w-full" />
                    <div className="grid grid-cols-12">
                        <div className="col-span-11">
                            <RelatedProductsCarousel products={relatedProducts} />
                        </div>
                    </div>
                </div>
            )}
            <div className="mb-6">
                <SellerBox {...product.seller} />
            </div>
            <div className="mb-6">
                <ProductDescription description={product.description} />
            </div>
            <div className="mb-6">
                <PaymentMethods methods={product.paymentMethods} />
            </div>
            {filteredBrandProducts.length > 0 && (
                <div className="mt-8 mb-8">
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
        </section>
    );
}
