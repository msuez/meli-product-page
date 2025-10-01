import { Router } from 'express';
import { PingController } from '../controllers/ping.controller';

export class PingRoutes {

    static get routes(): Router {
        const router = Router();
        const pingController = new PingController();

        // Swagger + Validations
        /**
         * @swagger
         * /ping:
         *   get:
         *     summary: Ping status
         *     description: Returns a Pong response to check the status of the API.
         *     operationId: pingStatus
         *     tags: 
         *       - Status
         *     responses:
         *       200:
         *         description: Successful response
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: Pong
         *                 status:
         *                   type: string
         *                   example: Success
         */
        router.get('/', pingController.ping);

        return router;
    }
}

