import { render, screen } from "@testing-library/react";
import ShareButton from "@/components/ui/ShareButton";

describe("ShareButton", () => {
    it("renders without crashing", () => {
        render(<ShareButton />);
        const button = screen.getByRole("button", { name: /compartir producto/i });
        expect(button).toBeInTheDocument();
    });

    it("renders an SVG icon", () => {
        const { container } = render(<ShareButton />);
        const svg = container.querySelector("svg");
        expect(svg).toBeInTheDocument();
    });
});
