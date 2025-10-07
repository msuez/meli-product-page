import { render, screen } from "@testing-library/react";
import SellerBox from "@/components/product/seller/SellerBox";
import { mockSeller } from "../../../fixtures/seller";

describe("SellerBox", () => {
    it("renders seller name, sales and button", () => {
        render(<SellerBox {...mockSeller} />);
        expect(screen.getByText(mockSeller.name)).toBeInTheDocument();
        expect(screen.getByText(/\+12000/)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /ir a la tienda oficial/i })).toBeInTheDocument();
    });

    it("renders seller logo image with correct alt text", () => {
        render(<SellerBox {...mockSeller} />);
        const img = screen.getByAltText(/samsung logo/i);
        expect(img).toBeInTheDocument();
    });

    it("renders green reputation bar when seller is platinum", () => {
        render(<SellerBox {...mockSeller} reputation="platinum" />);
        const greenBar = document.querySelector(".bg-green-500");
        expect(greenBar).toBeInTheDocument();
    });

    it("renders gray reputation bar when seller is not platinum", () => {
        render(<SellerBox {...mockSeller} reputation="silver" />);
        const grayBar = document.querySelector(".bg-gray-300");
        expect(grayBar).toBeInTheDocument();
    });

    it("uses default productsCount when not provided", () => {
        const { rerender } = render(
            <SellerBox
                id="test-id"
                name="Tienda Test"
                brand="TestBrand"
                sales={100}
                reputation="silver"
                logo="/test.png"
            />
        );
        expect(screen.getByText("+50")).toBeInTheDocument(); // default 50
        rerender(<SellerBox {...mockSeller} productsCount={999} />);
        expect(screen.getByText("+999")).toBeInTheDocument();
    });
});
