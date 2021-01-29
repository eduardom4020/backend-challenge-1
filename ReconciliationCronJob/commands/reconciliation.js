import BuildingBlocks from 'bino_bank_microservices_building_blocks_library';
import { services } from 'bino_bank_statement_core_library';

const DB_CONNECTION_STRING = 'mongodb://binoBank:123456@localhost:27017/?authSource=binoBank&readPreference=primary&ssl=false';
const DB_NAME = 'binoBank';

const DB_CONNECTION_STRING_P1 = 'mongodb://provider1:654321@localhost:27018/?authSource=provider1&readPreference=primary&ssl=false';
const DB_NAME_P1 = 'provider1';

const DB_CONNECTION_STRING_P2 = 'mongodb://provider2:123abc@localhost:27019/?authSource=provider2&readPreference=primary&ssl=false';
const DB_NAME_P2 = 'provider2';

const reconciliate = async () => {
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

    console.log('Reconciliated!');
}

reconciliate();