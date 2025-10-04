'use client';

interface ProductBestSellerBadgeProps {
    rank?: number;
    category?: string;
}

export default function ProductBestSellerBadge({
    rank = 8,
    category = "Celulares y Smartphones",
}: ProductBestSellerBadgeProps) {
    return (
        <div className="flex items-center gap-2 mt-1">
            <span className="bg-badge-bestseller text-white text-[11px] font-bold px-2 py-1 rounded">
                MÁS VENDIDO
            </span>
            <a href="#" className="text-primary text-xs hover:underline">
                {rank}° en {category}
            </a>
        </div>
    );
}
