import request from "supertest";
import { app } from "../../src/app";

describe("AppRoutes", () => {
    it("should mount /ping route", async () => {
        const res = await request(app.expressApp).get("/ping");
        expect(res.status).toBe(200);
    });
});
