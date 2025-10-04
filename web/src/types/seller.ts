export interface Seller {
    id: string;
    name: string;
    brand: string;
    sales: number;
    reputation: "platinum" | "gold" | "silver" | "new";
    productsCount?: number;
    logo: string;
}
