'use client';

interface ProductColorProps {
    color: { name: string; value: string };
    colorHex?: string; // opcional si querés mapearlo a un hex real
}

export default function ProductColor({ color, colorHex = '#1f2937' }: ProductColorProps) {
    return (
        <div>
            <p>
                Color: <span className="font-medium">{color.name}</span>
            </p>
            <div className="mt-1 w-10 h-10 border-2 border-primary rounded flex items-center justify-center">
                <div
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: color.value }}
                />
            </div>
        </div>
    );
}
