'use client';

import { Star } from "lucide-react";

interface ProductRatingProps {
    rating: number;
    reviews: number;
}

export default function ProductRating({ rating, reviews }: ProductRatingProps) {
    return (
        <div className="flex items-center gap-1 text-xs">
            <span className="text-secondary flex items-center">{rating}</span>
            <span className="text-primary flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        className={
                            i < Math.round(rating)
                                ? "fill-primary text-primary"
                                : "text-secondary"
                        }
                    />
                ))}
            </span>
            <span className="text-secondary hover:underline cursor-pointer">
                ({reviews})
            </span>
        </div>
    );
}
