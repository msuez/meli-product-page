import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Seller } from "@/types/seller";
import { getBrandLogo } from "@/lib/helpers/getBrandLogo";

export default function SellerBox({ name, brand, sales, reputation, productsCount = 50 }: Seller) {
    const brandLogos: Record<string, string> = {
        samsung: "/samsung.png",
        apple: "/apple.png",
        xiaomi: "/xiaomi.png",
        motorola: "/motorola.png",
        google: "/google.png",
        oneplus: "/oneplus.png",
    };

    const normalizedBrand = brand.toLowerCase();
    const matchedKey = Object.keys(brandLogos).find((key) =>
        normalizedBrand.includes(key)
    );
    const logoSrc = matchedKey ? brandLogos[matchedKey] : "/default.png";

    return (
        <div className="border border-border rounded-lg bg-white overflow-hidden shadow-sm">
            {/* Banner superior con degradado */}
            <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-black h-14 flex items-center justify-center text-white font-semibold text-sm relative">
                Tienda Oficial
                {/* Logo flotante con fondo blanco */}
                <div className="absolute -bottom-5 left-4 w-12 h-12 bg-white p-1 rounded shadow-md flex items-center justify-center">
                    <Image
                        src={getBrandLogo(brand || name)}
                        alt={`${brand || name} logo`}
                        width={40}
                        height={40}
                        className="object-contain"
                    />

                </div>
            </div>

            {/* Contenido */}
            <div className="pt-8 px-4 pb-4 space-y-3">
                {/* Nombre + badge */}
                <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">{name}</h4>
                    <CheckCircle2 className="text-primary w-4 h-4" />
                </div>
                <p className="text-secondary text-sm">Tienda oficial de Mercado Libre</p>
                <p className="text-sm font-medium">
                    <span className="text-foreground">+{productsCount}</span> Productos
                </p>

                {/* Barra de reputación */}
                <div className="flex gap-1 mt-2">
                    <div className="h-1 flex-1 bg-red-200 rounded" />
                    <div className="h-1 flex-1 bg-orange-200 rounded" />
                    <div className="h-1 flex-1 bg-yellow-200 rounded" />
                    <div className="h-1 flex-1 bg-lime-200 rounded" />
                    <div
                        className={`h-1 flex-1 rounded ${reputation === "platinum" ? "bg-green-500" : "bg-gray-300"
                            }`}
                    />
                </div>

                {/* Métricas */}
                <div className="flex justify-between text-xs mt-3 text-center">
                    <div className="flex-1">
                        <p className="font-semibold">+{sales}</p>
                        <p className="text-secondary">Ventas concretadas</p>
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold">✓</p>
                        <p className="text-secondary">Brinda buena atención</p>
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold">✓</p>
                        <p className="text-secondary">Entrega a tiempo</p>
                    </div>
                </div>

                {/* Botón */}
                <button className="w-full mt-4 bg-primary/10 text-primary font-medium py-2 rounded hover:bg-primary/20 transition">
                    Ir a la Tienda oficial
                </button>
            </div>
        </div>
    );
}
