import Image from "next/image";

import { getBrandLogo } from "@/lib/helpers/getBrandLogo";
import { Seller, Shipping } from "@/types";

interface ProductActionsProps {
    stock: number;
    shipping: Shipping;
    seller: Seller;
}

export default function ProductActions({ stock, shipping, seller }: ProductActionsProps) {
    return (
        <div className="border border-border rounded-lg bg-white p-4 space-y-4 text-sm">
            {/* Envío gratis */}
            {shipping.free_shipping && (
                <p className="text-success font-medium">
                    Envío gratis{" "}
                    <span className="text-secondary font-normal">a todo el país</span>
                </p>
            )}
            <p className="text-xs text-primary cursor-pointer hover:underline">
                Calcular cuándo llega
            </p>

            {/* Stock */}
            <div>
                <p className="font-semibold text-foreground">Stock disponible</p>
                <label className="block mt-1">
                    Cantidad:{" "}
                    <select className="border border-border rounded px-2 py-1 text-sm">
                        {[...Array(Math.min(stock, 10))].map((_, i) => (
                            <option key={i} value={i + 1}>
                                {i + 1} unidad{i > 0 ? "es" : ""}
                            </option>
                        ))}
                    </select>
                    <span className="ml-1 text-secondary">(+{stock} disponibles)</span>
                </label>
            </div>

            {/* Botones */}
            <div className="flex flex-col space-y-2">
                <button className="bg-primary text-white rounded-lg py-3 font-semibold hover:brightness-90">
                    Comprar ahora
                </button>
                <button className="bg-primary/10 border border-border text-primary rounded-lg py-3 font-semibold hover:bg-gray-50">
                    Agregar al carrito
                </button>
            </div>

            {/* Vendedor */}
            <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 relative">
                    <Image
                        src={getBrandLogo(seller.brand || seller.name)}
                        alt={`${seller.name} logo`}
                        fill
                        className="object-contain bg-white rounded border"
                    />
                </div>
                <div>
                    <p className="font-medium">
                        Tienda oficial{" "}
                        <span className="text-primary">{seller.name}</span>
                    </p>
                    <p className="text-secondary text-xs">+{seller.sales} ventas</p>
                </div>
            </div>

            {/* Beneficios */}
            <ul className="space-y-1 text-xs text-secondary">
                <li>
                    <span className="text-primary hover:underline cursor-pointer">
                        Devolución gratis.
                    </span>{" "}
                    Tenés 30 días desde que lo recibes.
                </li>
                <li>
                    <span className="text-primary hover:underline cursor-pointer">
                        Compra Protegida,
                    </span>{" "}
                    recibí el producto que esperabas o te devolvemos tu dinero.
                </li>
                <li>1 año de garantía de fábrica.</li>
            </ul>
        </div>
    );
}
