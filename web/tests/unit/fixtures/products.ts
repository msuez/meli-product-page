import { Product } from '@/types';

export const mockProduct: Product = {
    id: '1',
    title: 'Samsung Galaxy A55',
    brand: 'samsung',
    category: 'Celulares y Smartphones',
    price: 399.99,
    currency: 'USD',
    originalPrice: 499.99,
    discount: 20,
    rating: 4.5,
    reviewsCount: 125,
    soldQuantity: 300,
    condition: 'Nuevo',
    pictures: ['/images/a55/front.png', '/images/a55/back.png'],
    description: 'Powerful mid-range phone',
    stock: 25,

    shipping: {
        freeShipping: true,
        estimatedDays: 3,
    },

    seller: {
        id: 's1',
        name: 'TechStore',
        brand: 'Samsung',
        sales: 12000,
        reputation: 'platinum',
        logo: '/logos/samsung.png',
    },

    attributes: {
        pantalla: '6.6"',
        memoria: '128 GB',
        bluetooth: true,
    },

    attributesPreview: ['Pantalla 6.6"', '128 GB', 'Bluetooth'],

    bestSeller: true,

    installments: '12 cuotas de 33.33 USD',

    promo: '10% OFF OCA Blue Visa',

    color: { name: 'Azul Marino', value: '#001F3F' },

    paymentMethods: ['Visa', 'MasterCard', 'Amex'],
};

export const mockProducts: Product[] = [
    mockProduct,
    { ...mockProduct, id: '2', title: 'Galaxy S24' },
];