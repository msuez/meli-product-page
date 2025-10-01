import { Request, Response, NextFunction } from 'express';

export class PingController {
    public ping = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(200).json({
                message: 'Pong!'
            });
        } catch (error) {
            console.error(error);
            return res.sendStatus(500);
        }
    }
}