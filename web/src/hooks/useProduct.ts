
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/services/products";

export function useProduct(id: string) {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        staleTime: 1000 * 60, // cache 1 min
    });
}
