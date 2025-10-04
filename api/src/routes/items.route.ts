import { Router } from 'express';
import { param } from 'express-validator';

import { validateFields } from '../middlewares/validate-fields';
import { ItemsController } from '../controllers/items.controller';

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
         *         description: List of all products
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Product'
         *       500:
         *         description: Internal server error
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         */
        router.get('/', itemsController.getAll);

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
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Product'
         *       404:
         *         description: Product not found
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         *       500:
         *         description: Internal server error
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         */
        router.get(
            '/:id',
            [
                param('id').isString().withMessage('id must be a string'),
                validateFields,
            ],
            itemsController.getById
        );

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
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Product'
         *       404:
         *         description: Product not found
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         *       500:
         *         description: Internal server error
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         */
        router.get(
            '/:id/related',
            [
                param('id').isString().withMessage('id must be a string'),
                validateFields,
            ],
            itemsController.getRelated
        );

        /**
         * @swagger
         * /items/brand/{brand}:
         *   get:
         *     summary: Get products by brand
         *     description: Returns all products from a specific brand.
         *     tags:
         *       - Items
         *     parameters:
         *       - in: path
         *         name: brand
         *         required: true
         *         schema:
         *           type: string
         *         description: The product brand (e.g., Samsung, Apple)
         *     responses:
         *       200:
         *         description: List of products by brand
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Product'
         *       404:
         *         description: No products found for this brand
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         *       500:
         *         description: Internal server error
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         */
        router.get(
            '/brand/:brand',
            [
                param('brand').isString().withMessage('brand must be a string'),
                validateFields,
            ],
            itemsController.getByBrand
        );

        /**
         * @swagger
         * /items/{id}/page:
         *   get:
         *     summary: Get product page data
         *     description: Returns product details + related products + products of the same brand.
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
         *         description: Product page data with product + related + brand items
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 product:
         *                   $ref: '#/components/schemas/Product'
         *                 related:
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/Product'
         *                 sameBrand:
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/Product'
         *       404:
         *         description: Product not found
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         *       500:
         *         description: Internal server error
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         */
        router.get(
            '/:id/page',
            [
                param('id').isString().withMessage('id must be a string'),
                validateFields,
            ],
            itemsController.getProductPage
        );

        return router;
    }
}
