'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types/product';
import { useCarouselScroll } from '@/hooks/useCarouselScroll';

interface RelatedProductsCarouselProps {
    products: Product[];
}

export default function RelatedProductsCarousel({ products }: RelatedProductsCarouselProps) {
    const { scrollRef, scroll, canScrollLeft, canScrollRight } = useCarouselScroll();

    return (
        <div className="mt-12">
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Productos relacionados</h2>
                <p className="text-xs text-secondary">Promocionado</p>
            </div>
            <div className="relative">
                {canScrollLeft && (
                    <button
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-[#e6e6e6] rounded-full shadow-sm p-2 z-10 hover:bg-gray-100"
                    >
                        <ChevronLeft className="w-4 h-4 text-[#3483fa]" />
                    </button>
                )}
                <div
                    ref={scrollRef}
                    className="flex gap-3 overflow-x-hidden scroll-smooth pr-1"
                >
                    {products.map((p, idx) => (
                        <Link
                            key={p.id}
                            href={`/celulares/p/${p.id}`}
                            shallow
                            className="min-w-[210px] max-w-[210px] border border-border rounded-lg p-3 bg-white hover:shadow-md transition flex-shrink-0"
                        >
                            <div className="flex justify-center mb-3 relative w-[160px] h-[160px] mx-auto">
                                <Image
                                    src={p.pictures[0]}
                                    alt={p.title}
                                    fill={true}
                                    sizes="160px"
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-sm font-medium line-clamp-2 mb-2">{p.title}</p>
                            <div className="flex flex-col mb-2 text-sm">
                                {p.originalPrice && (
                                    <span className="line-through text-secondary text-[13px]">
                                        US$ {p.originalPrice}
                                    </span>
                                )}
                                <span className="text-lg font-bold text-foreground">
                                    US$ {p.price}{' '}
                                    {p.discount && (
                                        <span className="text-success font-semibold text-sm">
                                            {p.discount}% OFF
                                        </span>
                                    )}
                                </span>
                                {p.installments && (
                                    <span className="text-success text-[13px]">
                                        {p.installments}
                                    </span>
                                )}
                            </div>
                            {p.shipping.freeShipping && (
                                <p className="text-success text-[13px]">Envío gratis</p>
                            )}
                        </Link>
                    ))}
                </div>
                {canScrollRight && (
                    <button
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-[#e6e6e6] rounded-full shadow-sm p-2 z-10 hover:bg-gray-100"
                    >
                        <ChevronRight className="w-4 h-4 text-[#3483fa]" />
                    </button>
                )}
            </div>
        </div>
    );
}
