import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import http from 'http';

const PORT = 3000;
const HOST = 'localhost';

const app = new Koa();
const router = new Router();

app.use(logger());

router.get('/', (ctx, next) => {
    ctx.body = 'api is running...';
});
   
app.use(router.routes());
app.use(router.allowedMethods());

const server = http.createServer(app.callback()).listen(PORT, HOST);

console.log('Server running in ', `http://${HOST}:${PORT}`);

export default server;