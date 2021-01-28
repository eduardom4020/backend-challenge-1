import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import http from 'http';
import axios from 'axios';
import BuildingBlocks from 'bino_bank_microservices_building_blocks_library';
import { services, enums } from 'bino_bank_statement_core_library';

const PORT = 3001;
const HOST = 'localhost';

const DB_CONNECTION_STRING_P1 = 'mongodb://provider1:654321@localhost:27018/?authSource=provider1&readPreference=primary&ssl=false';
const DB_NAME_P1 = 'provider1';

const WEBHOOK_ENDPOINT = 'http://localhost:3000/reconciliate';

const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
    await BuildingBlocks.InitializeMongoWithCollections(ctx, DB_CONNECTION_STRING_P1, DB_NAME_P1);
    
    ctx.StatementService = new services.StatementService(ctx.provider1.bankStatement);
    next();
});

app.use(logger());

router.get('/', (ctx, next) => {
    ctx.body = 'Welcome to Provider\'s API';
});

router.post('/debit', (ctx, next) => {
    const { transactionType, amount=null } = ctx.query;
    const transactionEnum = enums.find(enums.TransactionType, transactionType);

    if(!transactionEnum || amount === null)
        return ctx.body = 'Necessary data not provided.';

    ctx.StatementService.create(enums.CashType.DEBIT, transactionEnum, amount);

    setTimeout(() => axios.get(WEBHOOK_ENDPOINT), 200);

    ctx.body = 'Debited!';
});

router.post('/credit', (ctx, next) => {
    const { transactionType, amount=null } = ctx.query;
    const transactionEnum = enums.find(enums.TransactionType, transactionType);

    if(!transactionEnum || amount === null)
        return ctx.body = 'Necessary data not provided.';

    ctx.StatementService.create(enums.CashType.CREDIT, transactionEnum, amount);

    setTimeout(() => axios.get(WEBHOOK_ENDPOINT), 200);

    ctx.body = 'Credited!';
});

app.use(router.routes());
app.use(router.allowedMethods());

const server = http.createServer(app.callback()).listen(PORT, HOST);

console.log('Server running in ', `http://${HOST}:${PORT}`);

export default server;