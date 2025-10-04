import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { NotFoundError, InternalServerError } from '../errors';

export class ItemsController {
    private products: any[];

    constructor() {
        const filePath = path.join(__dirname, '../../data/products.json');
        const rawData = fs.readFileSync(filePath, 'utf-8');
        this.products = JSON.parse(rawData);
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(200).json(this.products);
        } catch (error) {
            next(new InternalServerError('Error retrieving products'));
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const product = this.products.find((p) => p.id === id);

            if (!product) {
                throw new NotFoundError('Product not found');
            }

            return res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    };

    public getRelated = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const product = this.products.find((p) => p.id === id);

            if (!product) {
                throw new NotFoundError('Product not found');
            }

            const related = this.products.filter(
                (p) => p.id !== id && (p.seller.id === product.seller.id || p.category === product.category)
            );

            return res.status(200).json(related.slice(0, 4));
        } catch (error) {
            next(error);
        }
    };

    public getByBrand = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { brand } = req.params;
            const brandProducts = this.products.filter(
                (p) => p.brand.toLowerCase() === brand.toLowerCase()
            );

            if (brandProducts.length === 0) {
                throw new NotFoundError('No products found for this brand');
            }

            return res.status(200).json(brandProducts);
        } catch (error) {
            next(error);
        }
    };

    public getProductPage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const product = this.products.find((p) => p.id === id);

            if (!product) {
                throw new NotFoundError('Product not found');
            }

            const related = this.products
                .filter((p) => p.id !== id && (p.seller.id === product.seller.id || p.category === product.category))
                .slice(0, 4);

            const sameBrand = this.products
                .filter((p) => p.id !== id && p.brand === product.brand)
                .slice(0, 4);

            return res.status(200).json({
                product,
                related,
                sameBrand,
            });
        } catch (error) {
            next(error);
        }
    };
}
