import BuildingBlocks from 'bino_bank_microservices_building_blocks_library';
import { services } from 'bino_bank_statement_core_library';

export const initializeDatabaseMiddleware = async (ctx, next) => {
    await BuildingBlocks.InitializeMongoWithCollections(
        ctx, process.env.DB_CONNECTION_STRING, process.env.DB_NAME
    );
    
    ctx.StatementService = new services.StatementService(ctx.provider1.bankStatement);
    next();
}