import { Star, Heart, CheckCircle } from "lucide-react";
import Image from "next/image";

interface ProductInfoProps {
    title: string;
    price: number;
    stock: number;
    rating: number;
    reviews: number;
    originalPrice?: number;
    discount?: number;
    installments?: string;
    promo?: string;
    condition: "Nuevo" | "Usado" | "Reacondicionado";
    sold_quantity: number;
    color?: string;
    attributesPreview?: string[];
    sellerName?: string;
    sellerLogo?: string;
    best_seller?: boolean;
}

export default function ProductInfo({
    title,
    price,
    stock,
    rating,
    reviews,
    originalPrice,
    discount,
    installments,
    promo,
    condition,
    sold_quantity,
    color,
    best_seller,
    attributesPreview = [],
    sellerName = "Samsung",
    sellerLogo = "/samsung.png",
}: ProductInfoProps) {
    return (
        <div className="space-y-3 text-sm">
            {/* 🔹 Fila superior: tienda oficial + acciones */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src={sellerLogo}
                        alt={sellerName}
                        width={20}
                        height={20}
                        className="object-contain"
                    />
                    <a
                        href="#"
                        className=" text-primary hover:underline flex items-center gap-1 text-xs"
                    >
                        Visita la Tienda oficial de {sellerName}
                        <span className="text-primary"><CheckCircle /></span>
                    </a>
                </div>
            </div>

            {/* 🔹 Estado, vendidos + corazón */}
            <div className="flex items-center justify-between">
                <p className="text-xs text-secondary">
                    {condition} <span className="mx-1">|</span> +{sold_quantity} vendidos
                </p>
                <Heart className="w-5 h-5 text-secondary cursor-pointer hover:text-primary" />
            </div>

            {/* 🔹 Badge MÁS VENDIDO + categoría */}
            {best_seller && (
                <div className="flex items-center gap-2 mt-1">
                    <span className="bg-badge-bestseller text-white text-[11px] font-bold px-2 py-1 rounded">
                        MÁS VENDIDO
                    </span>
                    <a href="#" className="text-primary text-xs hover:underline">
                        8° en Celulares y Smartphones
                    </a>
                </div>
            )}


            {/* 🔹 Título */}
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>

            {/* 🔹 Rating */}
            <div className="flex items-center gap-1 text-xs">
                <span className="text-secondary flex items-center">
                    {rating}
                </span>
                <span className="text-primary flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            size={14}
                            className={
                                i < Math.round(rating)
                                    ? "fill-primary text-primary"
                                    : "text-secondary"
                            }
                        />
                    ))}
                </span>
                <span className="text-secondary hover:underline cursor-pointer">
                    ({reviews})
                </span>
            </div>

            {/* 🔹 Precio */}
            <div className="space-y-1">
                {originalPrice && (
                    <p className="text-secondary line-through text-sm">
                        US$ {originalPrice}
                    </p>
                )}
                <p className="text-3xl font-bold text-foreground">
                    US$ {price}{" "}
                    {discount && (
                        <span className="text-success text-xl font-semibold">
                            {discount}% OFF
                        </span>
                    )}
                </p>
                {installments && (
                    <p className="text-success text-sm">{installments}</p>
                )}
                {promo && (
                    <p className="bg-primary/10 text-primary inline-block px-2 py-1 text-xs font-medium rounded">
                        {promo}
                    </p>
                )}
            </div>

            {/* 🔹 Color */}
            {color && (
                <div>
                    <p>
                        Color: <span className="font-medium">{color}</span>
                    </p>
                    <div className="mt-1 w-10 h-10 border-2 border-primary rounded flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-800 rounded" />
                    </div>
                </div>
            )}

            {/* 🔹 Features rápidas */}
            {attributesPreview.length > 0 && (
                <div className="space-y-1">
                    <p className="font-semibold text-sm">
                        Lo que tienes que saber de este producto
                    </p>
                    <ul className="list-disc pl-4 text-secondary text-sm space-y-1">
                        {attributesPreview.map((attr, idx) => (
                            <li key={idx}>{attr}</li>
                        ))}
                    </ul>
                    <p className="text-primary text-xs hover:underline cursor-pointer">
                        Ver características
                    </p>
                </div>
            )}

            {/* 🔹 Opciones de compra */}
            <div>
                <p className="text-sm text-secondary">Opciones de compra:</p>
                <p className="text-primary text-sm hover:underline cursor-pointer">
                    3 productos nuevos desde US$ {price}
                </p>
            </div>
        </div>
    );
}
