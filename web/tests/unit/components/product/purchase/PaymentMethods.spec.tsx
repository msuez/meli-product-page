import { render, screen } from "@testing-library/react";
import PaymentMethods from "@/components/product/purchase/PaymentMethods";

jest.mock("@/lib/helpers/paymentMethods", () => ({
    PAYMENT_METHODS_LOGOS: {
        Visa: "/logos/visa.png",
        MasterCard: "/logos/mastercard.png",
        Amex: "/logos/amex.png",
    },
    PAYMENT_METHODS_CATEGORIES: {
        credit: ["Visa", "MasterCard", "Amex"],
        debit: [],
        cash: [],
    },
}));

describe("PaymentMethods", () => {
    const mockMethods = ["Visa", "MasterCard", "Amex"];

    it("renders null when no methods are provided", () => {
        const { container } = render(<PaymentMethods methods={[]} />);
        expect(container.firstChild).toBeNull();
    });

    it("renders section title and main promo text", () => {
        render(<PaymentMethods methods={mockMethods} />);
        expect(screen.getByRole("heading", { name: /medios de pago/i })).toBeInTheDocument();
        expect(screen.getByText(/pagá en hasta 12 cuotas sin interés/i)).toBeInTheDocument();
    });

    it("renders credit card logos when provided", () => {
        render(<PaymentMethods methods={mockMethods} />);
        expect(screen.getByLabelText(/visa logo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mastercard logo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/amex logo/i)).toBeInTheDocument();
    });

    it("renders link to view more payment options", () => {
        render(<PaymentMethods methods={mockMethods} />);
        const link = screen.getByRole("link", { name: /conocé otros medios de pago/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "#");
    });
});
