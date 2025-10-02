"use client";

import { useState } from "react";

interface ProductGalleryProps {
    pictures: string[];
}

export default function ProductGallery({ pictures }: ProductGalleryProps) {
    const [selected, setSelected] = useState(0);

    return (
        <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-2 w-20">
                {pictures.map((pic, idx) => (
                    <img
                        key={idx}
                        src={pic}
                        alt={`thumb-${idx}`}
                        onClick={() => setSelected(idx)}
                        className={`w-15 h-15 object-cover border border-border rounded cursor-pointer ${selected === idx
                            ? "border-primary ring-2 ring-primary"
                            : "hover:border-primary"
                            }`}
                    />
                ))}
            </div>

            {/* Imagen principal */}
            <div className="flex-1 flex items-center justify-center bg-white">
                <img
                    src={pictures[selected]}
                    alt={`main-${selected}`}
                    className="max-h-[500px] w-auto object-contain"
                />
            </div>
        </div>
    );
}
