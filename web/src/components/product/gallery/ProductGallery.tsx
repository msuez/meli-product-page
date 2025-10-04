'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
    pictures: string[];
}

export default function ProductGallery({ pictures }: ProductGalleryProps) {
    const [selected, setSelected] = useState(0);

    return (
        <div className="flex gap-4">
            <div className="hidden md:flex flex-col gap-2 w-20">
                {pictures.map((pic, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelected(idx)}
                        className={`relative w-16 aspect-square border rounded overflow-hidden ${selected === idx
                            ? 'border-primary ring-2 ring-primary'
                            : 'hover:border-primary'
                            }`}
                    >
                        <Image
                            src={pic}
                            alt={`thumb-${idx}`}
                            fill
                            sizes="64px"
                            className="object-contain"
                        />
                    </button>
                ))}
            </div>
            <div className="flex-1 flex items-center justify-center bg-white relative aspect-[4/5] max-h-[500px] w-full rounded">
                <Image
                    src={pictures[selected]}
                    alt={`main-${selected}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 70vw"
                    className="object-contain"
                    priority
                    fetchPriority="high"
                />
            </div>
        </div>
    );
}
