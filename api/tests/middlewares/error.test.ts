import { errorHandler } from "../../src/middlewares/error";
import { CustomError, NotFoundError } from "../../src/errors";
import { Request, Response } from "express";

describe("errorHandler", () => {
    it("should handle CustomError", () => {
        const err = new NotFoundError("Not found");
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        errorHandler(err, req, res, jest.fn());
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            statusCode: 404,
            message: "Not found",
        });
    });

    it("should handle generic Error", () => {
        const err = new Error("Unexpected");
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        errorHandler(err, req, res, jest.fn());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            statusCode: 500,
            message: "Internal Server Error",
        });
    });
});
