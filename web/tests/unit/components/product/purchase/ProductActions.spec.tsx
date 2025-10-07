import { render, screen } from "@testing-library/react";
import ProductActions from "@/components/product/purchase/ProductActions";
import { mockSeller } from "../../../fixtures/seller";

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} />;
    },
}));

describe("ProductActions", () => {
    const mockProps = {
        stock: 8,
        shipping: { freeShipping: true, estimatedDays: 3 },
        seller: mockSeller,
    };

    it("renders free shipping text and stock info", () => {
        render(<ProductActions {...mockProps} />);

        expect(screen.getByText(/envío gratis/i)).toBeInTheDocument();
        expect(screen.getByText(/\+8 disponibles/i)).toBeInTheDocument();
    });

    it("renders purchase and cart buttons", () => {
        render(<ProductActions {...mockProps} />);

        expect(screen.getByRole("button", { name: /comprar ahora/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /agregar al carrito/i })).toBeInTheDocument();
    });

    it("renders seller info with logo and sales", () => {
        render(<ProductActions {...mockProps} />);

        expect(screen.getByText(new RegExp(mockSeller.name, "i"))).toBeInTheDocument();
        expect(screen.getByText(new RegExp(`\\+${mockSeller.sales}`, "i"))).toBeInTheDocument();

        const logo = screen.getByAltText(new RegExp(`${mockSeller.name} logo`, "i"));
        expect(logo).toBeInTheDocument();
    });

    it("renders product policies", () => {
        render(<ProductActions {...mockProps} />);

        expect(screen.getByText(/devolución gratis/i)).toBeInTheDocument();
        expect(screen.getByText(/compra protegida/i)).toBeInTheDocument();
        expect(screen.getByText(/garantía de fábrica/i)).toBeInTheDocument();
    });
});
