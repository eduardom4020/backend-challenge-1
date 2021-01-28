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

const DB_CONNECTION_STRING_P1 = 'mongodb://provider1:654321@localhost:27018/?authSource=provider1&readPreference=primary&ssl=false';
const DB_NAME_P1 = 'provider1';

const DB_CONNECTION_STRING_P2 = 'mongodb://provider2:123abc@localhost:27019/?authSource=provider2&readPreference=primary&ssl=false';
const DB_NAME_P2 = 'provider2';

const app = new Koa();
const router = new Router();

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

router.get('/', (ctx, next) => {
    ctx.Provider1StatementService.create(enums.CashType.CREDIT, enums.TransactionType.PIX, 100);
    ctx.Provider1StatementService.create(enums.CashType.CREDIT, enums.TransactionType.BOLETO, 100);
    ctx.Provider1StatementService.create(enums.CashType.DEBIT, enums.TransactionType.TED, 100);
    ctx.Provider2StatementService.create(enums.CashType.CREDIT, enums.TransactionType.PIX, 200);
    ctx.Provider2StatementService.create(enums.CashType.DEBIT, enums.TransactionType.BOLETO, 200);
    ctx.body = 'data saved!';
});

router.get('/reconciliate', (ctx, next) => {
    ctx.ReconciliationService.reconciliate();
    ctx.body = 'reconciliated!';
});
   
app.use(router.routes());
app.use(router.allowedMethods());

const server = http.createServer(app.callback()).listen(PORT, HOST);

console.log('Server running in ', `http://${HOST}:${PORT}`);

export default server;