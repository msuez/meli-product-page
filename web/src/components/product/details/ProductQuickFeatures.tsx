'use client';

interface ProductQuickFeaturesProps {
    attributes: string[];
}

export default function ProductQuickFeatures({ attributes }: ProductQuickFeaturesProps) {
    if (!attributes.length) return null;

    return (
        <div className="space-y-1">
            <p className="font-semibold text-sm">
                Lo que tienes que saber de este producto
            </p>
            <ul className="list-disc pl-4 text-secondary text-sm space-y-1">
                {attributes.map((attr, idx) => (
                    <li key={idx}>{attr}</li>
                ))}
            </ul>
            <p className="text-primary text-xs hover:underline cursor-pointer">
                Ver características
            </p>
        </div>
    );
}
