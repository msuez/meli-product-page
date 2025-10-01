import { envs } from './config/envs';
import { Server } from './server';

export const app = new Server({
    port: envs.PORT!,
    env: envs.NODE_ENV!,
});