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
 *         category:
 *           type: string
 *           example: "Celulares y Smartphones"
 *         title:
 *           type: string
 *           example: "Samsung Galaxy A55 5G Dual SIM 256 GB Azul Oscuro 8 GB RAM"
 *         price:
 *           type: number
 *           example: 439
 *         originalPrice:
 *           type: number
 *           description: Precio original antes del descuento
 *           example: 499
 *         discount:
 *           type: integer
 *           description: Porcentaje de descuento aplicado
 *           example: 12
 *         installments:
 *           type: string
 *           description: Información de cuotas en formato texto
 *           example: "10 cuotas de $43.9 sin interés"
 *         promo:
 *           type: string
 *           description: Promoción activa o destacada
 *           example: "10% OFF OCA Blue Visa"
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
 *               enum: [platinum, gold, silver, bronze]
 *               example: "platinum"
 *             logo:
 *               type: string
 *               example: "/logos/samsung.png"
 *         attributes:
 *           type: object
 *           additionalProperties: true
 *           example:
 *             screenSize: "6.6\""
 *             ram: "8 GB"
 *             storage: "256 GB"
 *             mainCamera: "50 MP"
 *             frontCamera: "32 MP"
 *             nfc: true
 *         attributesPreview:
 *           type: array
 *           description: Lista de features destacados para vista rápida
 *           items:
 *             type: string
 *           example:
 *             - "Memoria RAM: 8 GB"
 *             - "Dispositivo desbloqueado para que elijas tu compañía telefónica preferida."
 *             - "Memoria interna de 256 GB"
 *         paymentMethods:
 *           type: array
 *           items:
 *             type: string
 *           example: ["VISA", "Mastercard", "AMEX"]
 *         shipping:
 *           type: object
 *           properties:
 *             freeShipping:
 *               type: boolean
 *               example: true
 *             estimatedDays:
 *               type: integer
 *               example: 3
 *         rating:
 *           type: number
 *           format: float
 *           example: 4.5
 *         reviewsCount:
 *           type: integer
 *           example: 795
 *         description:
 *           type: string
 *           example: "Con su potente procesador y 8 GB de RAM este dispositivo logra un alto rendimiento..."
 *         condition:
 *           type: string
 *           enum: [Nuevo, Usado, Reacondicionado]
 *           example: "Nuevo"
 *         soldQuantity:
 *           type: integer
 *           example: 500
 *         bestSeller:
 *           type: boolean
 *           example: true
 *         color:
 *           type: object
 *           description: Color principal del producto
 *           properties:
 *             name:
 *               type: string
 *               example: "Azul oscuro"
 *             value:
 *               type: string
 *               description: Código hexadecimal del color
 *               example: "#0d47a1"
 */
export { };
