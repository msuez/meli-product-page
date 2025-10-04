'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';

interface RelatedProductsListProps {
    products: Product[];
}

export default function RelatedProductsList({ products }: RelatedProductsListProps) {
    if (!products || products.length === 0) return null;

    return (
        <div className="border border-border rounded-lg bg-white p-4">
            <h3 className="text-sm font-semibold mb-1">Productos relacionados</h3>
            <p className="text-xs text-secondary mb-4">Promocionado</p>
            <div className="flex flex-col gap-3">
                {products.map((p, idx) => (
                    <Link
                        key={p.id}
                        href={`/celulares/p/${p.id}`}
                        shallow
                        className="flex gap-3 hover:shadow-md transition rounded-lg p-2"
                    >
                        <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                                src={p.pictures[0]}
                                alt={p.title}
                                fill
                                sizes="64px"
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col justify-between text-xs flex-1">
                            {p.originalPrice && (
                                <p className="line-through text-secondary text-[11px]">
                                    US$ {p.originalPrice}
                                </p>
                            )}
                            <p className="font-bold text-foreground text-sm">
                                US$ {p.price}{' '}
                                {p.discount && (
                                    <span className="text-success font-semibold">
                                        {p.discount}% OFF
                                    </span>
                                )}
                            </p>
                            {p.installments && (
                                <p className="text-success text-[11px]">{p.installments}</p>
                            )}
                            {p.shipping.freeShipping && (
                                <p className="text-success text-[11px]">Envío gratis</p>
                            )}
                            <p className="text-secondary line-clamp-1">{p.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
