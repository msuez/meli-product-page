import { render, screen } from '@testing-library/react';
import ErrorProduct from '@/components/product/errors/ErrorProduct';

describe('ErrorProduct', () => {
    it('renders default error message', () => {
        render(<ErrorProduct />);
        expect(screen.getByTestId('error-state')).toBeInTheDocument();
        expect(screen.getByText(/Error cargando el producto/i)).toBeInTheDocument();
    });

    it('renders custom error message', () => {
        render(<ErrorProduct message="Fallo la carga de datos." />);
        expect(screen.getByText(/Fallo la carga de datos/i)).toBeInTheDocument();
    });
});
