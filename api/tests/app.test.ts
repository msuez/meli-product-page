import request from "supertest";
import { app } from "../src/app";

describe("App", () => {
    it("should return 404 on unknown route", async () => {
        const res = await request(app.expressApp).get("/unknown");
        expect(res.status).toBe(404);
    });
});
