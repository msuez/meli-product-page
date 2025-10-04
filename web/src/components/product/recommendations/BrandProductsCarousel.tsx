'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types/product';
import { useCarouselScroll } from '@/hooks/useCarouselScroll';

interface BrandProductsCarouselProps {
    products: Product[];
    brand: string;
}

export default function BrandProductsCarousel({ products, brand }: BrandProductsCarouselProps) {
    const { scrollRef, scroll, canScrollLeft, canScrollRight } = useCarouselScroll();

    return (
        <div className="mt-12">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Productos de {brand}</h2>
            </div>

            <div className="relative">
                {canScrollLeft && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-[#e6e6e6] rounded-full shadow-sm p-2 z-10 hover:bg-gray-100"
                    >
                        <ChevronLeft className="w-4 h-4 text-[#3483fa]" />
                    </button>
                )}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-hidden scroll-smooth pr-1"
                >
                    {products.map((p) => (
                        <Link
                            key={p.id}
                            href={`/celulares/p/${p.id}`}
                            shallow
                            className="min-w-[320px] max-w-[340px] border border-border rounded-lg p-3 bg-white hover:shadow-md transition flex-shrink-0 flex items-center gap-4"
                        >
                            <div className="relative w-[120px] h-[120px] flex-shrink-0">
                                <Image
                                    src={p.pictures[0]}
                                    alt={p.title}
                                    fill
                                    sizes="120px"
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col justify-between text-xs flex-1">
                                <p className="font-medium line-clamp-2 text-sm">{p.title}</p>

                                {p.originalPrice && (
                                    <p className="line-through text-secondary text-[11px]">
                                        US$ {p.originalPrice}
                                    </p>
                                )}

                                <p className="font-bold text-foreground text-base">
                                    US$ {p.price}{' '}
                                    {p.discount && (
                                        <span className="text-success font-semibold text-xs">
                                            {p.discount}% OFF
                                        </span>
                                    )}
                                </p>

                                {p.installments && (
                                    <p className="text-success text-[11px]">
                                        {p.installments}
                                    </p>
                                )}

                                {p.shipping.freeShipping && (
                                    <p className="text-success text-[11px]">Envío gratis</p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
                {canScrollRight && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-[#e6e6e6] rounded-full shadow-sm p-2 z-10 hover:bg-gray-100"
                    >
                        <ChevronRight className="w-4 h-4 text-[#3483fa]" />
                    </button>
                )}
            </div>
            <div className="mt-5 flex items-center justify-between">
                <Link
                    href={`/marca/${brand.toLowerCase()}`}
                    className="text-primary text-xs hover:underline"
                >
                    Ver más productos de {brand}
                </Link>
            </div>
        </div>
    );
}
