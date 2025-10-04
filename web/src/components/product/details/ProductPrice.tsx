'use client';

interface ProductPriceProps {
    price: number;
    originalPrice?: number;
    discount?: number;
    installments?: string;
    promo?: string;
}

export default function ProductPrice({
    price,
    originalPrice,
    discount,
    installments,
    promo,
}: ProductPriceProps) {
    return (
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
    );
}
