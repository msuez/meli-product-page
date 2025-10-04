import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { validateFields } from '../../src/middlewares/validate-fields';
import { BadRequestError } from '../../src/errors';

jest.mock('express-validator', () => ({
    validationResult: jest.fn(),
}));

describe('validateFields middleware', () => {
    const mockReq = {} as Request;
    const mockRes = {} as Response;
    const mockNext = jest.fn() as NextFunction;

    const mockedValidationResult = validationResult as unknown as jest.MockedFunction<typeof validationResult>;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call next() with BadRequestError if validation fails', () => {
        const mockErrors = {
            isEmpty: jest.fn().mockReturnValue(false),
            array: jest.fn().mockReturnValue([
                { path: 'email', msg: 'is invalid' },
                { param: 'password', msg: 'is required' },
            ]),
        };

        mockedValidationResult.mockReturnValue(mockErrors as any);

        validateFields(mockReq, mockRes, mockNext);

        expect(mockedValidationResult).toHaveBeenCalledWith(mockReq);
        expect(mockNext).toHaveBeenCalledWith(expect.any(BadRequestError));

        const errorArg = (mockNext as jest.Mock).mock.calls[0][0];
        expect(errorArg.message).toContain('email is invalid');
        expect(errorArg.message).toContain('password is required');
        expect(errorArg.statusCode).toBe(400);
    });

    it('should call next() with no arguments if validation passes', () => {
        const mockResult = {
            isEmpty: jest.fn().mockReturnValue(true),
            array: jest.fn(),
        };

        mockedValidationResult.mockReturnValue(mockResult as any);

        validateFields(mockReq, mockRes, mockNext);

        expect(mockedValidationResult).toHaveBeenCalledWith(mockReq);
        expect(mockNext).toHaveBeenCalledWith();
    });
});
