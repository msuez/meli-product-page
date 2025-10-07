'use client';

interface ErrorProductProps {
    message?: string;
}

export default function ErrorProduct({
    message = 'Error cargando el producto.',
}: ErrorProductProps) {
    return (
        <p
            data-testid="error-state"
            className="text-center text-destructive mt-8"
        >
            {message}
        </p>
    );
}
