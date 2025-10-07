import { render, screen } from "@testing-library/react";
import FavoriteButton from "@/components/ui/FavoriteButton";

describe("FavoriteButton", () => {
    it("renders without crashing", () => {
        render(<FavoriteButton />);
        const button = screen.getByRole("button", { name: /agregar a favoritos/i });
        expect(button).toBeInTheDocument();
    });

    it("renders an SVG icon", () => {
        const { container } = render(<FavoriteButton />);
        const svg = container.querySelector("svg");
        expect(svg).toBeInTheDocument();
    });
});
