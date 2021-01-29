import { callWebhook } from '~/src/services/webhook';
import { enums } from 'bino_bank_statement_core_library';

export const creditMiddleware = async (ctx, _) => {
    const { transactionType, amount=null } = ctx.request.body;

    if(transactionType === enums.TransactionType.CARD.id)
        return ctx.throw(500, `${enums.TransactionType.CARD.name} transactions are only for ${enums.CashType.DEBIT.name}.`);

    const transactionEnum = enums.find(enums.TransactionType, transactionType);

    if(!transactionEnum || amount === null)
        return ctx.throw(422, 'Necessary data not provided.');

    await ctx.StatementService.create(enums.CashType.CREDIT, transactionEnum, amount);

    callWebhook();

    ctx.body = 'Credited!';
}