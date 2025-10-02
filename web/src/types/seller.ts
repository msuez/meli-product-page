export interface Seller {
    id: string;
    name: string;        // Ej: "Samsung Store"
    brand: string;       // Ej: "Samsung", "Apple", "Xiaomi"
    sales: number;
    reputation: "platinum" | "gold" | "silver" | "new";
    productsCount?: number;
}
