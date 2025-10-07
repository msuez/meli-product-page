import { render, screen } from "@testing-library/react";
import ProductDesktopLayout from "@/components/layouts/product/ProductDesktopLayout";
import { mockProduct, mockProducts } from "../../../fixtures/products";

describe("ProductDesktopLayout", () => {
    it("renders product title, price and seller info", () => {
        render(
            <ProductDesktopLayout
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

    it("renders breadcrumb with brand name", () => {
        render(
            <ProductDesktopLayout
                product={mockProduct}
                relatedProducts={mockProducts}
                brandProducts={mockProducts}
            />
        );

        expect(screen.getByText(mockProduct.brand)).toBeInTheDocument();
        expect(screen.getByText(/volver al listado/i)).toBeInTheDocument();
    });

    it("renders related and brand product sections when data is provided", () => {
        render(
            <ProductDesktopLayout
                product={mockProduct}
                relatedProducts={mockProducts}
                brandProducts={mockProducts}
            />
        );

        const elements = screen.getAllByText(/celulares y smartphones/i);
        expect(elements.length).toBeGreaterThan(0);
    });

    it("filters out the main product from brandProducts", () => {
        const { container } = render(
            <ProductDesktopLayout
                product={mockProduct}
                relatedProducts={mockProducts}
                brandProducts={[mockProduct, ...mockProducts]}
            />
        );

        expect(container.querySelectorAll("[data-testid='product-title']")).toHaveLength(1);
    });
});
