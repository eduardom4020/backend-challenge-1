export class Statement {
    constructor(transactions=[]) {
        this.transactions = transactions;
    }

    add(transaction) {
        this.transactions = [...this.transactions, transaction];
    }

    addRange(transactions) {
        this.transactions = [...this.transactions, ...transactions];
    }

    toJSON() {
        return this.transactions;
    }
}