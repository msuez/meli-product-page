
import { Router } from "express";
import { ItemsController } from "../controllers/items.controller";

export class ItemsRoutes {
    static get routes(): Router {
        const router = Router();
        const itemsController = new ItemsController();

        /**
         * @swagger
         * /items:
         *   get:
         *     summary: Get all products
         *     description: Returns a list of all available products.
         *     tags:
         *       - Items
         *     responses:
         *       200:
         *         description: List of products
         */
        router.get("/", itemsController.getAll);

        /**
         * @swagger
         * /items/{id}:
         *   get:
         *     summary: Get product by ID
         *     description: Returns details of a product by its ID.
         *     tags:
         *       - Items
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The product ID
         *     responses:
         *       200:
         *         description: Product found
         *       404:
         *         description: Product not found
         */
        router.get("/:id", itemsController.getById);

        /**
         * @swagger
         * /items/{id}/related:
         *   get:
         *     summary: Get related products
         *     description: Returns a list of related products based on seller or category.
         *     tags:
         *       - Items
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The product ID
         *     responses:
         *       200:
         *         description: List of related products
         *       404:
         *         description: Product not found
         */
        router.get("/:id/related", itemsController.getRelated);

        return router;
    }
}
