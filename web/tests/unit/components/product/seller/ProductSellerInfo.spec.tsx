import { render, screen } from "@testing-library/react";
import ProductSellerInfo from "@/components/product/seller/ProductSellerInfo";

describe("ProductSellerInfo", () => {
    const mockProps = {
        sellerName: "TechStore",
        sellerLogo: "/logos/samsung.png",
    };

    it("renders seller name and link text", () => {
        render(<ProductSellerInfo {...mockProps} />);
        expect(screen.getByText(/visita la tienda oficial de techstore/i)).toBeInTheDocument();
    });

    it("renders seller logo with correct alt text", () => {
        render(<ProductSellerInfo {...mockProps} />);
        const img = screen.getByAltText(mockProps.sellerName);
        expect(img).toBeInTheDocument();
    });

    it("renders link element", () => {
        render(<ProductSellerInfo {...mockProps} />);
        const link = screen.getByRole("link", { name: /visita la tienda oficial/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "#");
    });
});
