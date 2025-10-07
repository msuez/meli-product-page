import { render, screen } from '@testing-library/react';
import NotFoundProduct from '@/components/product/errors/NotFoundProduct';

describe('NotFoundProduct', () => {
    it('renders not found message', () => {
        render(<NotFoundProduct />);
        const msg = screen.getByTestId('not-found-state');
        expect(msg).toBeInTheDocument();
        expect(msg).toHaveTextContent(/Producto no encontrado/i);
    });
});
