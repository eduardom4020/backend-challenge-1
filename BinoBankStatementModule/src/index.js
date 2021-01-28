import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import http from 'http';
import BuildingBlocks from 'bino_bank_microservices_building_blocks_library';
import { services, enums } from 'bino_bank_statement_core_library';

const PORT = 3000;
const HOST = 'localhost';
const DB_CONNECTION_STRING = 'mongodb://binoBank:123456@localhost:27017/?authSource=binoBank&readPreference=primary&ssl=false';
const DB_NAME = 'binoBank';

const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
    await BuildingBlocks.InitializeMongoWithCollections(ctx, DB_CONNECTION_STRING, DB_NAME);
    ctx.StatementService = new services.StatementService(ctx.binoBank.bankStatement);
    next();
});

app.use(logger());

router.get('/', (ctx, next) => {
    ctx.StatementService.create(enums.CashType.CREDIT, enums.TransactionType.PIX, 100);
    ctx.body = 'api is running...';
});
   
app.use(router.routes());
app.use(router.allowedMethods());

const server = http.createServer(app.callback()).listen(PORT, HOST);

console.log('Server running in ', `http://${HOST}:${PORT}`);

export default server;