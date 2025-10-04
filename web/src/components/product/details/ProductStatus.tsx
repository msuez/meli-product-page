'use client';

interface ProductStatusProps {
    condition: "Nuevo" | "Usado" | "Reacondicionado";
    soldQuantity: number;
}

export default function ProductStatus({ condition, soldQuantity }: ProductStatusProps) {
    return (
        <p className="text-xs text-secondary">
            {condition} <span className="mx-1">|</span> +{soldQuantity} vendidos
        </p>
    );
}
