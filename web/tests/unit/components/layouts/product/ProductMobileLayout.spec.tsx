import { render, screen } from "@testing-library/react";
import ProductMobileLayout from "@/components/layouts/product/ProductMobileLayout";
import { mockProduct, mockProducts } from "../../../fixtures/products";

describe("ProductMobileLayout", () => {
    it("renders product title, price and seller info", () => {
        render(
            <ProductMobileLayout
                product={mockProduct}
                relatedProducts={mockProducts}
                brandProducts={mockProducts}
            />
        );

        expect(screen.getByTestId("product-title")).toHaveTextContent(mockProduct.title);
        expect(screen.getByTestId("product-price")).toBeInTheDocument();

        const sellerElements = screen.getAllByText(mockProduct.seller.name);
        expect(sellerElements.length).toBeGreaterThan(0);
    });

    it("renders related and brand product sections when data is provided", () => {
        render(
            <ProductMobileLayout
                product={mockProduct}
                relatedProducts={mockProducts}
                brandProducts={mockProducts}
            />
        );

        expect(screen.getByText(/celulares y smartphones/i)).toBeInTheDocument();
    });

    it("filters out the main product from brandProducts", () => {
        const { container } = render(
            <ProductMobileLayout
                product={mockProduct}
                relatedProducts={mockProducts}
                brandProducts={[mockProduct, ...mockProducts]}
            />
        );

        expect(container.querySelectorAll("[data-testid='product-title']")).toHaveLength(1);
    });
});
