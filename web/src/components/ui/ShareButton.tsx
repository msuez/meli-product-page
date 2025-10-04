'use client';

import { Share2 } from 'lucide-react';

export default function ShareButton() {
    return (
        <button
            className="bg-[#f5f5f5] p-2 rounded-full shadow-sm border border-border hover:bg-gray-200 transition"
            aria-label="Compartir producto"
        >
            <Share2 className="w-5 h-5 text-[#3483FA]" />
        </button>
    );
}
