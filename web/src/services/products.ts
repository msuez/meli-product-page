import { api } from './api';
import { Product } from '@/types/product';

export async function getAllProducts(): Promise<Product[]> {
    const { data } = await api.get('/items');
    return data;
}

export async function getProductById(id: string): Promise<Product> {
    const { data } = await api.get(`/items/${id}`);
    return data;
}

export async function getRelatedProducts(id: string): Promise<Product[]> {
    const { data } = await api.get(`/items/${id}/related`);
    return data;
}

export async function getProductsByBrand(brand: string): Promise<Product[]> {
    const { data } = await api.get(`/items/brand/${brand}`);
    return data;
}

export async function getProductPageData(
    id: string
): Promise<{ product: Product; related: Product[]; sameBrand: Product[] }> {
    const { data } = await api.get(`/items/${id}/page`);
    return data;
}
