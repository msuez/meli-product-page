import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { Seller } from "@/types/seller";

export default function SellerBox({ name, brand, sales, reputation, productsCount = 50, logo }: Seller) {

    return (
        <div className="border border-border rounded-lg bg-white overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-black h-14 flex items-center justify-center text-white font-semibold text-sm relative">
                Tienda Oficial
                <div className="absolute -bottom-5 left-4 w-12 h-12 bg-white p-1 rounded shadow-md flex items-center justify-center">
                    <Image
                        src={logo}
                        alt={`${brand || name} logo`}
                        width={40}
                        height={40}
                        className="object-contain"
                    />

                </div>
            </div>

            <div className="pt-8 px-4 pb-4 space-y-3">
                <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">{name}</h4>
                    <BadgeCheck className="w-6 h-6 fill-primary text-white" />
                </div>
                <p className="text-secondary text-sm">Tienda oficial de Mercado Libre</p>
                <p className="text-sm font-medium">
                    <span className="text-foreground">+{productsCount}</span> Productos
                </p>

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

                <button className="w-full mt-4 bg-primary/10 text-primary font-medium py-2 rounded hover:bg-primary/20 transition">
                    Ir a la Tienda oficial
                </button>
            </div>
        </div>
    );
}
