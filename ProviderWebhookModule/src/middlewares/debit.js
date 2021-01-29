import { callWebhook } from '~/src/services/webhook';
import { enums } from 'bino_bank_statement_core_library';

export const debitMiddleware = async (ctx, _) => {
    const { transactionType, amount=null } = ctx.request.body;
    const transactionEnum = enums.find(enums.TransactionType, transactionType);

    if(!transactionEnum || amount === null)
        return ctx.throw(422, 'Necessary data not provided.');

    await ctx.StatementService.create(enums.CashType.DEBIT, transactionEnum, amount);

    callWebhook();

    ctx.body = 'Debited!';
}