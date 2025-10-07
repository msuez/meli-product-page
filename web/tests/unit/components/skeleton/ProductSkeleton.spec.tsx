import { render, screen } from '@testing-library/react';
import ProductSkeleton from '@/components/product/skeleton/ProductSkeleton';

describe('ProductSkeleton', () => {
    it('renders loading placeholder', () => {
        render(<ProductSkeleton />);
        const skeleton = screen.getByTestId('loading-state');
        expect(skeleton).toBeInTheDocument();
    });
});
