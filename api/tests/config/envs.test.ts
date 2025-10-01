describe("envs config", () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });

    it("should load valid environment variables", () => {
        process.env.PORT = "4000";
        process.env.NODE_ENV = "test";

        const { envs } = require("../../src/config/envs");

        expect(envs.PORT).toBe(4000);
        expect(envs.NODE_ENV).toBe("test");
    });

    it("should throw error if PORT is missing", () => {
        delete process.env.PORT;
        process.env.NODE_ENV = "test";

        expect(() => require("../../src/config/envs")).toThrow(
            /"PORT" is a required variable/
        );
    });

    it("should throw error if NODE_ENV is missing", () => {
        process.env.PORT = "4000";
        delete process.env.NODE_ENV;

        expect(() => require("../../src/config/envs")).toThrow(
            /"NODE_ENV" is a required variable/
        );
    });
});
