import request from 'supertest';
import { Server } from '../src/server';
import type { Application } from 'express';
import type { Server as HttpServer } from 'http';

describe('Server class', () => {
    let serverInstance: Server;
    let app: Application;

    beforeAll(() => {
        serverInstance = new Server({ env: 'test', port: 0 });
        app = serverInstance.expressApp;
    });

    it('should respond to /ping with Pong!', async () => {
        const res = await request(app).get('/ping');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'Pong!' });
    });

    it('should return 404 with NotFoundError on unknown route', async () => {
        const res = await request(app).get('/unknown-route');
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('statusCode', 404);
        expect(res.body).toHaveProperty('message');
    });

    it('should start the server and log message', async () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

        const listenSpy = jest
            .spyOn(app, 'listen')
            .mockImplementation(
                ((port: number, host: string, cb?: () => void): HttpServer => {
                    if (cb) cb();
                    return {} as HttpServer;
                }) as Application['listen']
            );

        await serverInstance.start();

        expect(listenSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining('🚀 API listening test')
        );

        listenSpy.mockRestore();
        logSpy.mockRestore();
    });
});
