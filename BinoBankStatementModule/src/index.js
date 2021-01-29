import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import http from 'http';
import koaBody from 'koa-body';
import BuildingBlocks from 'bino_bank_microservices_building_blocks_library';
import { services, enums } from 'bino_bank_statement_core_library';
import { CashOperation } from './middlewares/providerCash';

const PORT = 3000;
const HOST = '0.0.0.0';

const DB_CONNECTION_STRING = 'mongodb://binoBank:123456@192.168.0.1:27017/?authSource=binoBank&readPreference=primary&ssl=false';
const DB_NAME = 'binoBank';

const DB_CONNECTION_STRING_P1 = 'mongodb://provider1:654321@192.168.0.1:27018/?authSource=provider1&readPreference=primary&ssl=false';
const DB_NAME_P1 = 'provider1';

const DB_CONNECTION_STRING_P2 = 'mongodb://provider2:123abc@192.168.0.1:27019/?authSource=provider2&readPreference=primary&ssl=false';
const DB_NAME_P2 = 'provider2';

const app = new Koa();
const router = new Router();

app.use(koaBody());

app.use(async (ctx, next) => {
    await BuildingBlocks.InitializeMongoWithCollections(ctx, DB_CONNECTION_STRING, DB_NAME);
    await BuildingBlocks.InitializeMongoWithCollections(ctx, DB_CONNECTION_STRING_P1, DB_NAME_P1);
    await BuildingBlocks.InitializeMongoWithCollections(ctx, DB_CONNECTION_STRING_P2, DB_NAME_P2);

    ctx.MainStatementService = new services.StatementService(ctx.binoBank.bankStatement);

    ctx.Provider1StatementService = new services.StatementService(ctx.provider1.bankStatement);
    ctx.Provider2StatementService = new services.StatementService(ctx.provider2.bankStatement);

    ctx.ReconciliationService = new services.ReconciliationService(ctx.MainStatementService);
    ctx.ReconciliationService.attachServices(ctx.Provider1StatementService, ctx.Provider2StatementService);

    next();
});

app.use(logger());

router.get('/', (ctx, _) => {
    ctx.body = 'Welcome to Bino Bank API!';
});

router.post('/debit', CashOperation(enums.CashType.DEBIT));
router.post('/credit', CashOperation(enums.CashType.CREDIT));

router.post('/reconciliate', (ctx, _) => {
    console.log(ctx.request.body);
    ctx.ReconciliationService.reconciliate();
    ctx.body = 'Reconciliated!';
});

router.get('/statement', async (ctx, _) => {
    const { start, end } = ctx.request.query;
    const statement = ctx.MainStatementService.listBetween(start, end);
    ctx.body = statement.map(t => t.toJSON());
})
   
app.use(router.routes());
app.use(router.allowedMethods());

const server = http.createServer(app.callback()).listen(PORT, HOST);

console.log('Server running in ', `http://${HOST}:${PORT}`);

export default server;