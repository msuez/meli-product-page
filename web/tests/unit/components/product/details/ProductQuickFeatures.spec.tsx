import { render, screen } from "@testing-library/react";
import ProductQuickFeatures from "@/components/product/details/ProductQuickFeatures";

describe("ProductQuickFeatures", () => {
    it("renders null when no attributes are provided", () => {
        const { container } = render(<ProductQuickFeatures attributes={[]} />);
        expect(container.firstChild).toBeNull();
    });

    it("renders title and list of attributes", () => {
        const features = ["Pantalla OLED", "Carga rápida", "Resistencia al agua"];
        render(<ProductQuickFeatures attributes={features} />);

        expect(
            screen.getByText(/lo que tienes que saber de este producto/i)
        ).toBeInTheDocument();

        features.forEach((feature) => {
            expect(screen.getByText(feature)).toBeInTheDocument();
        });

        expect(screen.getByText(/ver características/i)).toBeInTheDocument();
    });
});
