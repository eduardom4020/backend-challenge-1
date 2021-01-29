
import { enums } from 'bino_bank_statement_core_library';

export const debitMiddleware = (ctx, _) => {
    const { transactionType, amount=null } = ctx.query;
    const transactionEnum = enums.find(enums.TransactionType, transactionType);

    if(!transactionEnum || amount === null)
        return ctx.body = 'Necessary data not provided.';

    ctx.StatementService.create(enums.CashType.DEBIT, transactionEnum, amount);

    callWebhook();

    ctx.body = 'Debited!';
}