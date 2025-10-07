'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function NotFoundProduct() {
    return (
        <div data-testid="not-found-state" className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2">
                Producto no encontrado
            </h2>
            <p className="text-secondary mb-6">
                Es posible que haya sido eliminado o no exista.
            </p>
            <Link
                href="/"
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
            >
                Volver al inicio
            </Link>
        </div>
    );
}
