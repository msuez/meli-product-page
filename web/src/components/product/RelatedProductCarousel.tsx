"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/product";

interface RelatedProductsCarouselProps {
    products: Product[];
}

export default function RelatedProductsCarousel({ products }: RelatedProductsCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            scrollRef.current.scrollTo({
                left: direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="mt-12">
            {/* Header del carrusel */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Productos relacionados</h2>
                <p className="text-xs text-secondary">Promocionado</p>
            </div>

            <div className="relative">
                {/* Botón izquierda */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow p-2 z-10 hover:bg-gray-100"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Scrollable container */}
                <div
                    ref={scrollRef}
                    className="flex gap-3 overflow-x-hidden scroll-smooth pr-1"
                >
                    {products.map((p) => (
                        <Link
                            key={p.id}
                            href={`/celulares/p/${p.id}`}
                            shallow
                            className="min-w-[140px] border border-border rounded-lg p-2 bg-white hover:shadow-sm transition flex-shrink-0"
                        >
                            <div className="flex justify-center">
                                <Image
                                    src={p.pictures[0]}
                                    alt={p.title}
                                    width={100}
                                    height={100}
                                    className="object-contain h-24"
                                />
                            </div>
                            <p className="text-xs font-medium mt-2 line-clamp-2">{p.title}</p>
                            <p className="text-base font-bold text-foreground">US$ {p.price}</p>
                            {p.shipping.free_shipping && (
                                <p className="text-success text-xs">Envío gratis</p>
                            )}
                        </Link>
                    ))}
                </div>

                {/* Botón derecha */}
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow p-2 z-10 hover:bg-gray-100"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
