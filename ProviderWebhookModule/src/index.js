import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import http from 'http';
import { creditMiddleware } from './middlewares/credit';
import { debitMiddleware } from './middlewares/debit';
import { ROUTE_DEBIT, ROUTE_CREDIT } from './routes';
import { initializeDatabaseMiddleware } from './configurations/initialize';

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = new Koa();
const router = new Router();

app.use(koaBody());

app.use(initializeDatabaseMiddleware);

app.use(logger());

router.get('/', (ctx, _) => {
    ctx.body = `Welcome to ${process.env.API_NAME} API`;
});

router.post(`/${ROUTE_DEBIT}`, debitMiddleware);
router.post(`/${ROUTE_CREDIT}`, creditMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

const server = http.createServer(app.callback()).listen(PORT, HOST);

console.log('Server running in ', `http://${HOST}:${PORT}`);

export default server;