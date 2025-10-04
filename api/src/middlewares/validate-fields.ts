
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestError } from '../errors';

export const validateFields = (req: Request, _res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const msg = result
            .array()
            .map(err => `${(err as any).path ?? (err as any).param} ${err.msg}`)
            .join(', ');
        return next(new BadRequestError(msg));
    }
    return next();
};
