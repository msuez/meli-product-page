import { Seller } from "./seller";
import { Shipping } from "./shipping";

export interface Product {
    id: string;
    title: string;
    price: number;
    currency: string;
    pictures: string[];
    stock: number;
    brand: string;
    category: string;
    description: string;
    attributes: Record<string, string | boolean>;
    payment_methods: string[];
    shipping: Shipping;
    seller: Seller;
    rating: number;
    reviews_count: number;
    condition: "Nuevo" | "Usado" | "Reacondicionado";
    sold_quantity: number;
    best_seller: boolean;
}
