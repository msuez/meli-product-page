'use client';

import Image from 'next/image';
import FavoriteButton from '@/components/ui/FavoriteButton';
import ShareButton from '@/components/ui/ShareButton';
import { useSwipeCarousel } from '@/hooks/useSwipeCarousel';

interface ProductGalleryCarouselProps {
    pictures: string[];
}

export default function ProductGalleryCarousel({ pictures }: ProductGalleryCarouselProps) {
    const { current, setCurrent, handleTouchStart, handleTouchEnd } = useSwipeCarousel({
        total: pictures.length,
    });

    return (
        <section className="relative w-full bg-white">
            <div
                className="relative w-full aspect-square overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <Image
                    key={pictures[current]}
                    src={pictures[current]}
                    alt={`product-${current}`}
                    fill
                    className="object-contain transition-transform duration-300 ease-in-out"
                    priority
                    fetchPriority="high"
                    sizes="100vw"
                />
                <div className="absolute top-2 right-2">
                    <FavoriteButton />
                </div>
                <div className="absolute bottom-2 right-2">
                    <ShareButton />
                </div>
                <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm text-xs text-foreground px-2 py-0.5 rounded-full border border-border">
                    {current + 1} / {pictures.length}
                </div>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                    {pictures.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`w-2 h-2 rounded-full transition-colors duration-200 ${i === current ? 'bg-primary' : 'bg-gray-300'
                                }`}
                            aria-label={`Ir a imagen ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
