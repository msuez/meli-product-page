'use client';

interface ProductPurchaseOptionsProps {
    price: number;
    optionsCount?: number;
}

export default function ProductPurchaseOptions({
    price,
    optionsCount = 3,
}: ProductPurchaseOptionsProps) {
    return (
        <div>
            <p className="text-sm text-secondary">Opciones de compra:</p>
            <p className="text-primary text-sm hover:underline cursor-pointer">
                {optionsCount} productos nuevos desde US$ {price}
            </p>
        </div>
    );
}
