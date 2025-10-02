import { useQuery } from "@tanstack/react-query";
import { getRelatedProducts } from "@/services/products";
import { Product } from "@/types/product";

export function useRelatedProducts(id: string) {
    return useQuery<Product[], Error>({
        queryKey: ["relatedProducts", id],
        queryFn: () => getRelatedProducts(id),
    });
}