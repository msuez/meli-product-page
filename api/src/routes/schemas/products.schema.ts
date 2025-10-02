/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "a55-5g"
 *         brand:
 *           type: string
 *           example: "Samsung"
 *         title:
 *           type: string
 *           example: "Samsung Galaxy A55 5G Dual SIM 256 GB Azul Oscuro 8 GB RAM"
 *         price:
 *           type: number
 *           example: 439
 *         currency:
 *           type: string
 *           example: "USD"
 *         pictures:
 *           type: array
 *           items:
 *             type: string
 *             example: "/images/a55/front.png"
 *         stock:
 *           type: integer
 *           example: 150
 *         seller:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "seller-123"
 *             name:
 *               type: string
 *               example: "Samsung Store"
 *             brand:
 *               type: string
 *               example: "Samsung"
 *             sales:
 *               type: integer
 *               example: 5000
 *             reputation:
 *               type: string
 *               example: "platinum"
 *         attributes:
 *           type: object
 *           additionalProperties: true
 *           example:
 *             screen_size: "6.6\""
 *             ram: "8 GB"
 *             storage: "256 GB"
 *             main_camera: "50 MP"
 *             front_camera: "32 MP"
 *             nfc: true
 *         payment_methods:
 *           type: array
 *           items:
 *             type: string
 *             example: "VISA"
 *         shipping:
 *           type: object
 *           properties:
 *             free_shipping:
 *               type: boolean
 *               example: true
 *             estimated_days:
 *               type: integer
 *               example: 3
 *         rating:
 *           type: number
 *           example: 4.5
 *         reviews_count:
 *           type: integer
 *           example: 795
 *         description:
 *           type: string
 *           example: "Con su potente procesador y 8 GB de RAM..."
 *         condition:
 *           type: string
 *           enum: [Nuevo, Usado, Reacondicionado]
 *           example: "Nuevo"
 *         sold_quantity:
 *           type: integer
 *           example: 500
 *         best_seller:
 *           type: boolean
 *           example: true
 */
export { };
