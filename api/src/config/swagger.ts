import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application, Request, Response } from 'express';

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Linkd.bio',
            version: '1.0.0',
            description: 'API Documentation',
        },
        servers: [
            {
                url: 'http://localhost:4000',
                description: 'Development API Server',
            },
        ],
    },
    apis: [
        path.join(process.cwd(), 'src/routes/**/*.ts'),
        path.join(process.cwd(), 'src/routes/schemas/**/*.ts'),
    ],

});

export function setupSwagger(app: Application) {
    app.get('/openapi.json', (_req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    app.use(
        '/docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, {
            customCss: '.swagger-ui .topbar { display: none }',
        }),
    );
}