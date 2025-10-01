import { PingController } from "../../src/controllers/ping.controller";
import { Request, Response, NextFunction } from "express";

describe("PingController", () => {
    it("should return Pong! with status 200", async () => {
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        const controller = new PingController();
        await controller.ping(req, res, jest.fn());

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Pong!" });
    });

    it("should handle error and return 500", async () => {
        jest.spyOn(console, "error").mockImplementation(() => { });
        const req = {} as Request;
        const res = {
            status: jest.fn(() => {
                throw new Error("Mock failure");
            }),
            json: jest.fn(),
            sendStatus: jest.fn(),
        } as unknown as Response;

        const controller = new PingController();
        await controller.ping(req, res, jest.fn());

        expect(res.sendStatus).toHaveBeenCalledWith(500);
    });
});
