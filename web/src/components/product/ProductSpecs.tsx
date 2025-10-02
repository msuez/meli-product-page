interface ProductSpecsProps {
    attributes: Record<string, string | boolean>;
}

export default function ProductSpecs({ attributes }: ProductSpecsProps) {
    return (
        <div className="border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Especificaciones</h3>
            <ul className="space-y-1">
                {Object.entries(attributes).map(([key, value]) => (
                    <li key={key} className="text-secondary">
                        <span className="font-semibold capitalize">{key}:</span>{" "}
                        {typeof value === "boolean" ? (value ? "Sí" : "No") : value}
                    </li>
                ))}
            </ul>
        </div>
    );
}
