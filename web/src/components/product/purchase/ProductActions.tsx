'use client';

import Image from 'next/image';
import { Undo2, ShieldCheck, Award } from 'lucide-react';

import { Seller, Shipping } from '@/types';

interface ProductActionsProps {
    stock: number;
    shipping: Shipping;
    seller: Seller;
}

export default function ProductActions({ stock, shipping, seller }: ProductActionsProps) {
    return (
        <div className="border border-border rounded-lg bg-white p-4 space-y-4 text-sm">
            {shipping.freeShipping && (
                <p className="text-success font-medium">
                    Envío gratis{' '}
                    <span className="text-secondary font-normal">a todo el país</span>
                </p>
            )}
            <p className="text-xs text-primary cursor-pointer hover:underline">
                Calcular cuándo llega
            </p>
            <div>
                <p className="font-semibold text-foreground">Stock disponible</p>
                <label className="block mt-1">
                    Cantidad:{' '}
                    <select
                        className="border border-border rounded px-2 py-1 text-sm"
                        defaultValue={1}
                    >
                        {[...Array(Math.min(stock, 10))].map((_, i) => (
                            <option key={i} value={i + 1}>
                                {i + 1} unidad{i > 0 ? 'es' : ''}
                            </option>
                        ))}
                    </select>
                    <span className="ml-1 text-secondary">(+{stock} disponibles)</span>
                </label>
            </div>
            <div className="flex flex-col space-y-2">
                <button className="bg-primary text-white rounded-lg py-3 font-semibold hover:brightness-90">
                    Comprar ahora
                </button>
                <button className="bg-primary/10 border border-border text-primary rounded-lg py-3 font-semibold hover:bg-gray-50">
                    Agregar al carrito
                </button>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 relative flex-shrink-0">
                    <Image
                        src={seller.logo}
                        alt={`${seller.name} logo`}
                        width={32}
                        height={32}
                        className="object-contain bg-white rounded"
                    />
                </div>
                <div>
                    <p className="font-medium">
                        Tienda oficial <span className="text-primary">{seller.name}</span>
                    </p>
                    <p className="text-secondary text-xs">+{seller.sales} ventas</p>
                </div>
            </div>
            <ul className="space-y-2 text-xs text-secondary">
                <li className="flex items-start gap-2">
                    <Undo2 className="w-4 h-4 text-secondary mt-0.5" />
                    <span>
                        <span className="text-primary hover:underline cursor-pointer">
                            Devolución gratis.
                        </span>{' '}
                        Tenés 30 días desde que lo recibes.
                    </span>
                </li>
                <li className="flex items-start gap-2">
                    <ShieldCheck className="w-5 h-5 text-secondary mt-0.5" />
                    <span>
                        <span className="text-primary hover:underline cursor-pointer">
                            Compra Protegida,
                        </span>{' '}
                        recibí el producto que esperabas o te devolvemos tu dinero.
                    </span>
                </li>
                <li className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-secondary mt-0.5" />
                    <span>1 año de garantía de fábrica.</span>
                </li>
            </ul>
        </div>
    );
}
