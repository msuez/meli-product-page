import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

import { NotFoundError, InternalServerError } from '../../src/errors';
import { ItemsController } from '../../src/controllers/items.controller';

import { mockProducts } from '../fixtures/products.mock';

jest.mock('fs');
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('ItemsController', () => {
    let controller: ItemsController;
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: jest.MockedFunction<NextFunction>;

    beforeEach(() => {
        jest.clearAllMocks();

        mockedFs.readFileSync.mockReturnValue(JSON.stringify(mockProducts));

        controller = new ItemsController();

        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        mockNext = jest.fn();
    });

    // ────────────────────────────────
    // getAll
    // ────────────────────────────────
    describe('getAll', () => {
        it('should return all products', async () => {
            await controller.getAll(mockReq as Request, mockRes as Response, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockProducts);
        });

        it('should handle internal errors gracefully', async () => {
            (mockRes.status as jest.Mock).mockImplementation(() => {
                throw new Error('Mock failure');
            });

            await controller.getAll(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(InternalServerError));
        });
    });

    // ────────────────────────────────
    // getById
    // ────────────────────────────────
    describe('getById', () => {
        it('should return a product by id', async () => {
            mockReq = { params: { id: '1' } };
            await controller.getById(mockReq as Request, mockRes as Response, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockProducts[0]);
        });

        it('should call next with NotFoundError if product not found', async () => {
            mockReq = { params: { id: '999' } };
            await controller.getById(mockReq as Request, mockRes as Response, mockNext);
            expect(mockNext).toHaveBeenCalledWith(expect.any(NotFoundError));
        });
    });

    // ────────────────────────────────
    // getRelated
    // ────────────────────────────────
    describe('getRelated', () => {
        it('should return up to 4 related products', async () => {
            mockReq = { params: { id: '1' } };
            await controller.getRelated(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            const related = (mockRes.json as jest.Mock).mock.calls[0][0];
            expect(Array.isArray(related)).toBe(true);
            expect(related.length).toBeLessThanOrEqual(4);
        });

        it('should call next with NotFoundError if product not found', async () => {
            mockReq = { params: { id: '999' } };
            await controller.getRelated(mockReq as Request, mockRes as Response, mockNext);
            expect(mockNext).toHaveBeenCalledWith(expect.any(NotFoundError));
        });
    });

    // ────────────────────────────────
    // getByBrand
    // ────────────────────────────────
    describe('getByBrand', () => {
        it('should return products by brand (case-insensitive)', async () => {
            mockReq = { params: { brand: 'apple' } };
            await controller.getByBrand(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            const data = (mockRes.json as jest.Mock).mock.calls[0][0];
            expect(data.every((p: any) => p.brand.toLowerCase() === 'apple')).toBe(true);
        });

        it('should call next with NotFoundError if no brand matches', async () => {
            mockReq = { params: { brand: 'unknown' } };
            await controller.getByBrand(mockReq as Request, mockRes as Response, mockNext);
            expect(mockNext).toHaveBeenCalledWith(expect.any(NotFoundError));
        });
    });

    // ────────────────────────────────
    // getProductPage
    // ────────────────────────────────
    describe('getProductPage', () => {
        it('should return product with related and sameBrand arrays', async () => {
            mockReq = { params: { id: '1' } };
            await controller.getProductPage(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            const body = (mockRes.json as jest.Mock).mock.calls[0][0];
            expect(body).toHaveProperty('product');
            expect(body).toHaveProperty('related');
            expect(body).toHaveProperty('sameBrand');
            expect(Array.isArray(body.related)).toBe(true);
            expect(Array.isArray(body.sameBrand)).toBe(true);
        });

        it('should call next with NotFoundError if product not found', async () => {
            mockReq = { params: { id: '999' } };
            await controller.getProductPage(mockReq as Request, mockRes as Response, mockNext);
            expect(mockNext).toHaveBeenCalledWith(expect.any(NotFoundError));
        });
    });
});
