
import { enums } from 'bino_bank_statement_core_library';

export const creditMiddleware = (ctx, _) => {
    const { transactionType, amount=null } = ctx.request.body;

    if(transactionType === enums.TransactionType.CARD.id)
        return ctx.body = `${enums.TransactionType.CARD.name} transactions are only for ${enums.CashType.DEBIT.name}.`;

    const transactionEnum = enums.find(enums.TransactionType, transactionType);

    if(!transactionEnum || amount === null)
        return ctx.body = 'Necessary data not provided.';

    ctx.StatementService.create(enums.CashType.CREDIT, transactionEnum, amount);

    callWebhook();

    ctx.body = 'Credited!';
}