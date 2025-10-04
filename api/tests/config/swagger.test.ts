import request from 'supertest';
import express, { Application } from 'express';
import { swaggerSpec, setupSwagger } from '../../src/config/swagger';

describe('Swagger config', () => {
    let app: Application;

    beforeAll(() => {
        app = express();
        setupSwagger(app);
    });

    it('should generate a valid swagger spec', () => {
        const spec: any = swaggerSpec;
        expect(spec).toHaveProperty('openapi', '3.0.3');
        expect(spec).toHaveProperty('info');
        expect(spec.info).toHaveProperty('title', 'Meli challenge - Product Page');
    });

    it('should expose swagger spec at /openapi.json', async () => {
        const res = await request(app).get('/openapi.json');
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/application\/json/);
        expect(res.body).toHaveProperty('openapi', '3.0.3');
    });

    it('should mount swagger UI at /docs', async () => {
        const res = await request(app).get('/docs');
        expect([200, 301, 302]).toContain(res.status);
    });
});
