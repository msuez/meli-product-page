'use client';

import Image from "next/image";
import { BadgeCheck } from "lucide-react";

interface ProductSellerInfoProps {
    sellerName: string;
    sellerLogo: string;
}

export default function ProductSellerInfo({
    sellerName,
    sellerLogo,
}: ProductSellerInfoProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Image
                    src={sellerLogo}
                    alt={sellerName}
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <a
                    href="#"
                    className="text-primary hover:underline flex items-center gap-1 text-xs"
                >
                    Visita la Tienda oficial de {sellerName}
                    <BadgeCheck className="w-5 h-5 fill-primary text-white" />
                </a>
            </div>
        </div>
    );
}
