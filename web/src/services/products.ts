
import { api } from "./api";
import { Product } from "@/types/product";

export async function getProductById(id: string): Promise<Product> {
    const { data } = await api.get(`/items/${id}`);
    return data;
}

export async function getRelatedProducts(id: string): Promise<Product[]> {
    const { data } = await api.get(`/items/${id}/related`);
    return data;
}
