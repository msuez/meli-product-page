// src/controllers/items.controller.ts
import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";

export class ItemsController {
    private products: any[];

    constructor() {
        const filePath = path.join(__dirname, "../../data/products.json");
        const rawData = fs.readFileSync(filePath, "utf-8");
        this.products = JSON.parse(rawData);
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(200).json(this.products);
        } catch (error) {
            console.error(error);
            return res.sendStatus(500);
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const product = this.products.find((p) => p.id === id);

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            return res.status(200).json(product);
        } catch (error) {
            console.error(error);
            return res.sendStatus(500);
        }
    };

    public getRelated = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const product = this.products.find((p) => p.id === id);

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            const related = this.products.filter(
                (p) => p.id !== id && (p.seller.id === product.seller.id || p.category === product.category)
            );

            return res.status(200).json(related.slice(0, 4)); // limitar a 4 productos
        } catch (error) {
            console.error(error);
            return res.sendStatus(500);
        }
    };
}
