describe('envs config', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });

    it('should load valid environment variables', async () => {
        process.env.PORT = '4000';
        process.env.NODE_ENV = 'test';

        const { envs } = await import('../../src/config/envs');

        expect(envs.PORT).toBe(4000);
        expect(envs.NODE_ENV).toBe('test');
    });

    it('should throw error if PORT is missing', async () => {
        delete process.env.PORT;
        process.env.NODE_ENV = 'test';

        await expect(async () => {
            await import('../../src/config/envs');
        }).rejects.toThrow(/"PORT" is a required variable/);
    });

    it('should throw error if NODE_ENV is missing', async () => {
        process.env.PORT = '4000';
        delete process.env.NODE_ENV;

        await expect(async () => {
            await import('../../src/config/envs');
        }).rejects.toThrow(/"NODE_ENV" is a required variable/);
    });
});
