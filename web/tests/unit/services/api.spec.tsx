import { api } from "@/services/api";

describe("services/api", () => {
    beforeEach(() => {
        jest.resetModules();
        delete process.env.NEXT_PUBLIC_API_URL;
    });

    it("should create axios instance", async () => {
        const { api } = await import("@/services/api");
        expect(api).toBeDefined();
        expect(typeof api.get).toBe("function");
    });

    it("should have correct default baseURL (fallback)", async () => {
        const { api } = await import("@/services/api");
        expect(api.defaults.baseURL).toBe("http://localhost:4000");
    });

    it("should have correct timeout configuration", async () => {
        const { api } = await import("@/services/api");
        expect(api.defaults.timeout).toBe(5000);
    });

    it("should respect NEXT_PUBLIC_API_URL env var if defined", async () => {
        process.env.NEXT_PUBLIC_API_URL = "https://mock-api.com";
        jest.resetModules();
        const { api } = await import("@/services/api");
        expect(api.defaults.baseURL).toBe("https://mock-api.com");
    });
});
