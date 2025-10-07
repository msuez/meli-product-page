import { render, screen, fireEvent } from "@testing-library/react";
import ProductSpecs from "@/components/product/details/ProductSpecs";

describe("ProductSpecs", () => {
    const baseAttributes = {
        screen_size: "6.7 pulgadas",
        ram: "8GB",
        storage: "256GB",
        main_camera: "48MP",
        nfc: true,
        unlock: false,
    };

    it("renders visible specs by default (first 4 only)", () => {
        render(<ProductSpecs attributes={baseAttributes} />);

        expect(screen.getByText("Características del producto")).toBeInTheDocument();
        expect(screen.getByText(/screen size/i)).toBeInTheDocument();
        expect(screen.getByText(/ram/i)).toBeInTheDocument();

        const items = screen.getAllByText(/:/);
        expect(items.length).toBe(4);

        expect(screen.getByText(/ver todas las características/i)).toBeInTheDocument();
    });

    it("expands and collapses when button is clicked", () => {
        render(<ProductSpecs attributes={baseAttributes} />);
        const button = screen.getByRole("button", { name: /ver todas las características/i });

        fireEvent.click(button);
        expect(screen.getByText(/ver menos características/i)).toBeInTheDocument();
        expect(screen.getAllByText(/:/).length).toBe(Object.keys(baseAttributes).length);

        fireEvent.click(button);
        expect(screen.getByText(/ver todas las características/i)).toBeInTheDocument();
    });

    it("renders boolean values as Sí/No and default icon", () => {
        const attributes = { bluetooth: true, gps: false };
        render(<ProductSpecs attributes={attributes} />);

        expect(screen.getByText(/sí/i)).toBeInTheDocument();
        expect(screen.getByText(/no/i)).toBeInTheDocument();
    });

    it("renders without expand button when 4 or fewer attributes", () => {
        const attributes = {
            screen_size: "6.1 pulgadas",
            ram: "4GB",
            storage: "128GB",
            nfc: false,
        };
        render(<ProductSpecs attributes={attributes} />);
        expect(screen.queryByRole("button")).toBeNull();
    });
});
