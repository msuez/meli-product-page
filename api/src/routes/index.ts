import {
    Router,
} from 'express';

import { PingRoutes } from './ping.route';
import { ItemsRoutes } from './items.route';

export class AppRoutes {

    static get Routes(): Router {

        const router = Router();

        router.use('/ping', PingRoutes.routes);
        router.use('/items', ItemsRoutes.routes);

        return router;
    }

}

