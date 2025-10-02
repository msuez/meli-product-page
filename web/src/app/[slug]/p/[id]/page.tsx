"use client";

import { use, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductActions from "@/components/product/ProductActions";
import PaymentMethods from "@/components/product/PaymentMethods";
import SellerBox from "@/components/product/SellerBox";
import ProductSpecs from "@/components/product/ProductSpecs";
import ProductDescription from "@/components/product/ProductDescription";
import RelatedProductsCarousel from "@/components/product/RelatedProductCarousel";

import { useProduct } from "@/hooks/useProduct";
import { useRelatedProducts } from "@/hooks/useRelatedProduct";

export default function ProductPage({
    params,
}: {
    params: Promise<{ slug: string; id: string }>;
}) {
    const { id } = use(params);

    // Escuchar cambios en la ruta para volver a cargar datos con shallow
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { data: product, isLoading, error } = useProduct(id);
    const { data: relatedProducts } = useRelatedProducts(id);

    useEffect(() => {
        // ⚡ Esto asegura que se re-renderice al cambiar el ID en la URL con shallow routing
    }, [pathname, searchParams]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading product</p>;
    if (!product) return <p>No product found</p>;

    return (
        <div className="w-full mx-auto px-2 lg:px-6 py-6 bg-background-page">
            {/* También puede interesarte */}
            <div className="hidden md:block text-sm text-secondary mb-2">
                <span className="font-semibold">También puede interesarte:</span>{" "}
                funda samsung a54 - samsung galaxy - celulares - samsung s54
            </div>

            {/* Breadcrumb + acciones */}
            <div className="hidden md:flex justify-between items-center text-sm mb-6">
                <div className="flex items-center gap-1">
                    <a href="/" className="text-primary hover:underline">Volver al listado</a>
                    <span className="text-secondary">{">"}</span>
                    <a href="/" className="text-primary hover:underline">Celulares y Telefonía</a>
                    <span className="text-secondary">{">"}</span>
                    <a href="/" className="text-primary hover:underline">Celulares y Smartphones</a>
                    <span className="text-secondary">{">"}</span>
                    <span className="text-primary">Samsung</span>
                </div>

                <div className="flex gap-4 text-primary">
                    <a href="#" className="hover:underline">Vender uno igual</a>
                    <span className="text-secondary">|</span>
                    <a href="#" className="hover:underline">Compartir</a>
                </div>
            </div>

            {/* WRAP principal */}
            <div className="bg-white rounded-md shadow-sm p-6">
                <div className="grid grid-cols-12 gap-8">
                    {/* MAIN IZQUIERDO */}
                    <main className="col-span-12 lg:col-span-8">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-6">
                                <ProductGallery pictures={product.pictures} />
                            </div>

                            <div className="col-span-12 lg:col-span-6">
                                <ProductInfo
                                    title={product.title}
                                    price={product.price}
                                    stock={product.stock}
                                    rating={product.rating}
                                    reviews={product.reviews_count}
                                    originalPrice={499}
                                    discount={12}
                                    best_seller={product.best_seller}
                                    condition={product.condition}
                                    sold_quantity={product.sold_quantity}
                                    installments="en 10 cuotas de $1.914 sin interés"
                                    promo="10% OFF OCA Blue Visa"
                                    color="Azul oscuro"
                                    attributesPreview={[
                                        "Memoria RAM: 8 GB",
                                        "Dispositivo desbloqueado para que elijas tu compañía telefónica preferida.",
                                        "Memoria interna de 256 GB",
                                    ]}
                                />
                            </div>
                        </div>

                        {/* Separador + Relacionados */}
                        {relatedProducts && relatedProducts.length > 0 && (
                            <div className="mt-8">
                                <hr className="mb-6 border-border" />
                                <RelatedProductsCarousel products={relatedProducts} />
                            </div>
                        )}
                    </main>

                    {/* ASIDE DERECHO */}
                    <aside className="col-span-12 lg:col-span-4 space-y-6">
                        <ProductActions
                            stock={product.stock}
                            shipping={product.shipping}
                            seller={product.seller}
                        />
                        <SellerBox {...product.seller} />
                        <PaymentMethods
                            methods={{
                                credit: ["/visa.png", "/mastercard.png", "/amex.png", "/oca.png"],
                                debit: ["/visa.png", "/mastercard.png"],
                                cash: ["/abitab.png", "/redpagos.png"],
                            }}
                        />
                    </aside>
                </div>
            </div>

            {/* Specs + Descripción */}
            <div className="mt-10 grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    <ProductSpecs attributes={product.attributes} />
                    <ProductDescription description={product.description} />
                </div>
            </div>
        </div>
    );
}
