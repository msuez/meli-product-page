interface ProductDescriptionProps {
    description: string;
}

export default function ProductDescription({ description }: ProductDescriptionProps) {
    return (
        <div className="border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Descripción</h3>
            <p className="text-secondary">{description}</p>
        </div>
    );
}
