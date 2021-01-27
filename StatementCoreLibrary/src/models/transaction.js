import { v4 as uuidv4 } from 'uuid';

export class Transaction {
    constructor(cashType, transactionType, amount) {
        this.id = uuidv4();
        this.description = `${cashType.name} via ${transactionType.name}`;
        this.entryDate = new Date().toISOString();
        this.transactionType = transactionType.id;
        this.type = cashType.id;

        this.amount = amount;
    }

    toJSON() {
        return {
            'transaction-id': this.id,
            'description': this.description,
            'transaction-type': this.transactionType,
            'entry-date': this.entryDate,
            'amount': this.amount,
            'type': this.type
        }
    }
}