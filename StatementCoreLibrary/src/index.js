import { CashType } from './enums/cashType';
import { TransactionType } from './enums/transactionType';
import { Transaction } from './models/transaction';
import { User } from './models/user';
import { Notification } from './models/notification';
import { Statement } from './models/statement'; 

export const models = {
    Transaction,
    User,
    Notification,
    Statement
};

export const enums = {
    CashType,
    TransactionType
};