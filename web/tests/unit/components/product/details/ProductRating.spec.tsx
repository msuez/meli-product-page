import { render, screen } from "@testing-library/react";
import ProductStatus from "@/components/product/details/ProductStatus";

describe("ProductStatus", () => {
    it("renders condition and sold quantity correctly", () => {
        render(<ProductStatus condition="Nuevo" soldQuantity={120} />);
        expect(screen.getByText(/nuevo/i)).toBeInTheDocument();
        expect(screen.getByText(/\+120 vendidos/i)).toBeInTheDocument();
    });

    it("renders 'Usado' condition correctly", () => {
        render(<ProductStatus condition="Usado" soldQuantity={5} />);
        expect(screen.getByText(/usado/i)).toBeInTheDocument();
        expect(screen.getByText(/\+5 vendidos/i)).toBeInTheDocument();
    });

    it("renders 'Reacondicionado' condition correctly", () => {
        render(<ProductStatus condition="Reacondicionado" soldQuantity={300} />);
        expect(screen.getByText(/reacondicionado/i)).toBeInTheDocument();
        expect(screen.getByText(/\+300 vendidos/i)).toBeInTheDocument();
    });
});
