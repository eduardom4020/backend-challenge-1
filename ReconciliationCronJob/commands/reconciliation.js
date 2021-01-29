import BuildingBlocks from 'bino_bank_microservices_building_blocks_library';
import { services } from 'bino_bank_statement_core_library';

const DB_CONNECTION_STRING = 'mongodb://binoBank:123456@192.168.0.1:27017/?authSource=binoBank&readPreference=primary&ssl=false';
const DB_NAME = 'binoBank';

const DB_CONNECTION_STRING_P1 = 'mongodb://provider1:654321@192.168.0.1:27018/?authSource=provider1&readPreference=primary&ssl=false';
const DB_NAME_P1 = 'provider1';

const DB_CONNECTION_STRING_P2 = 'mongodb://provider2:123abc@192.168.0.1:27019/?authSource=provider2&readPreference=primary&ssl=false';
const DB_NAME_P2 = 'provider2';

const reconciliate = () => new Promise(async (res, rej) => {
    
    try {
        const context = {};

        await BuildingBlocks.InitializeMongoWithCollections(context, DB_CONNECTION_STRING, DB_NAME);
        await BuildingBlocks.InitializeMongoWithCollections(context, DB_CONNECTION_STRING_P1, DB_NAME_P1);
        await BuildingBlocks.InitializeMongoWithCollections(context, DB_CONNECTION_STRING_P2, DB_NAME_P2);

        const MainStatementService = new services.StatementService(context.binoBank.bankStatement);
        const Provider1StatementService = new services.StatementService(context.provider1.bankStatement);
        const Provider2StatementService = new services.StatementService(context.provider2.bankStatement);

        const ReconciliationService = new services.ReconciliationService(MainStatementService);
        ReconciliationService.attachServices(Provider1StatementService, Provider2StatementService);

        ReconciliationService.reconciliate();

        res('Reconciliated!');
    } catch(e) {
        rej(e);
    }
    
});

reconciliate()
    .then(r => ([r, 0]))
    .catch(e => ([e, 1]))
    .then(([msg, code]) => {
        console.log(msg);
        process.exit(code);
    });