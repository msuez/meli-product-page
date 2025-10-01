
import cors from 'cors';

import express, {
    Application,
    NextFunction,
    Request,
    Response,
} from 'express';

import { AppRoutes } from './routes';
import { setupSwagger } from './config/swagger';

import { NotFoundError } from './errors';
import { errorHandler } from './middlewares/error';

interface ServerOptions {
    env: string;
    port: number;
}

export class Server {

    private readonly env: string;
    private readonly port: number;
    private readonly host: string;

    public readonly app: Application = express();

    constructor({
        env,
        port,
    }: ServerOptions) {
        this.env = env;
        this.port = port;
        this.host = '0.0.0.0';
        this.create();
    }

    private create() {

        //* Cors config
        this.app.use(cors());

        //* Parse request
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: true,
        }));

        //* Swagger
        setupSwagger(this.app);

        //* Routes
        this.app.use('/', AppRoutes.Routes);

        //* Catch all
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            next(new NotFoundError(`Route ${req.originalUrl} not found`));
        });

        //* Error handler
        this.app.use(errorHandler);
    }

    public get expressApp(): Application {
        return this.app;
    }

    public async start() {
        this.app.listen(this.port, this.host, () => {
            console.log(`🚀 API listening ${this.env} on http://${this.host}:${this.port}`);
        });
    }

}
