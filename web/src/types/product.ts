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
    paymentMethods: string[];
    shipping: Shipping;
    seller: Seller;
    rating: number;
    reviewsCount: number;
    condition: "Nuevo" | "Usado" | "Reacondicionado";
    soldQuantity: number;
    bestSeller: boolean;
    originalPrice: number;
    discount: number;
    installments: string;
    promo: string;
    color: { name: string; value: string };
    attributesPreview: string[];
}
