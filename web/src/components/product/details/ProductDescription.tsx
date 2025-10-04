interface ProductDescriptionProps {
    description: string;
}

export default function ProductDescription({ description }: ProductDescriptionProps) {
    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold">Descripción</h2>
            <p className="text-secondary mt-4">{description}</p>
        </div>
    );
}
