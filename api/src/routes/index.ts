import {
    Router,
} from 'express';

import { PingRoutes } from '../routes/ping.route';

export class AppRoutes {

    static get Routes(): Router {

        const router = Router();

        router.use('/ping', PingRoutes.routes);

        return router;
    }

}

