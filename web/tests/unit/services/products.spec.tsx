import { api } from "@/services/api";
import {
    getAllProducts,
    getProductById,
    getRelatedProducts,
    getProductsByBrand,
    getProductPageData,
} from "@/services/products";
import { mockProduct, mockProducts } from "../fixtures/products";

jest.mock("@/services/api");
const mockedApi = api as jest.Mocked<typeof api>;

describe("services/products", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch all products", async () => {
        mockedApi.get.mockResolvedValueOnce({ data: mockProducts });
        const result = await getAllProducts();
        expect(mockedApi.get).toHaveBeenCalledWith("/items");
        expect(result).toEqual(mockProducts);
    });

    it("should fetch product by id", async () => {
        mockedApi.get.mockResolvedValueOnce({ data: mockProduct });
        const result = await getProductById("1");
        expect(mockedApi.get).toHaveBeenCalledWith("/items/1");
        expect(result).toEqual(mockProduct);
    });

    it("should fetch related products", async () => {
        mockedApi.get.mockResolvedValueOnce({ data: mockProducts });
        const result = await getRelatedProducts("1");
        expect(mockedApi.get).toHaveBeenCalledWith("/items/1/related");
        expect(result).toEqual(mockProducts);
    });

    it("should fetch products by brand", async () => {
        mockedApi.get.mockResolvedValueOnce({ data: mockProducts });
        const result = await getProductsByBrand("samsung");
        expect(mockedApi.get).toHaveBeenCalledWith("/items/brand/samsung");
        expect(result).toEqual(mockProducts);
    });

    it("should fetch product page data", async () => {
        const mockResponse = {
            product: mockProduct,
            related: mockProducts,
            sameBrand: mockProducts,
        };
        mockedApi.get.mockResolvedValueOnce({ data: mockResponse });
        const result = await getProductPageData("1");
        expect(mockedApi.get).toHaveBeenCalledWith("/items/1/page");
        expect(result).toEqual(mockResponse);
    });
});
