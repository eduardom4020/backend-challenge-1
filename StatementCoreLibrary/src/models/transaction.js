import { v4 as uuidv4 } from 'uuid';

const TRANSACTION_ID_KEY = 'transaction-id';
const DESCRIPTION_KEY = 'description';
const TRANSACTION_TYPE_KEY = 'transaction-type';
const ENTRY_DATE_KEY = 'entry-date';
const AMOUNT_KEY = 'amount';
const TYPE_KEY = 'type';

export class Transaction {
    constructor(cashType=null, transactionType=null, amount=null) {
        if(cashType !== null && transactionType !== null && amount !== null) {
            this.id = uuidv4();
            this.description = `${cashType.name} via ${transactionType.name}`;
            this.entryDate = new Date().toISOString();
            this.transactionType = transactionType.id;
            this.type = cashType.id;

            this.amount = amount;
        }
    }

    toJSON() {
        return {
            [TRANSACTION_ID_KEY]: this.id,
            [DESCRIPTION_KEY]: this.description,
            [TRANSACTION_TYPE_KEY]: this.transactionType,
            [ENTRY_DATE_KEY]: this.entryDate,
            [AMOUNT_KEY]: this.amount,
            [TYPE_KEY]: this.type
        }
    }

    static parse(json) {
        const transaction = new Transaction();
        transaction.id = json[TRANSACTION_ID_KEY];
        transaction.description = json[DESCRIPTION_KEY];
        transaction.transactionType = json[TRANSACTION_TYPE_KEY];
        transaction.entryDate = json[ENTRY_DATE_KEY];
        transaction.amount = json[AMOUNT_KEY];
        transaction.type = json[TYPE_KEY];
    }

    static fields() {
        return {
            id: TRANSACTION_ID_KEY,
            description: DESCRIPTION_KEY,
            transactionType: TRANSACTION_TYPE_KEY,
            entryDate: ENTRY_DATE_KEY,
            amount: AMOUNT_KEY,
            type: TYPE_KEY
        };
    }
}