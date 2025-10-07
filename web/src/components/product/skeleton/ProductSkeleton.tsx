'use client';

export default function ProductSkeleton() {
    return (
        <section data-testid="loading-state" className="animate-pulse p-6 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-64 bg-gray-200 rounded-lg" />
            <div className="h-6 bg-gray-200 rounded w-2/3" />
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="h-10 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
        </section>
    );
}
