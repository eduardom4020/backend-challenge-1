export class User {
    constructor(balance) {
        this.balance = balance;
    }

    toJSON() {
        return { balance: this.balance };
    }

    getFields() {
        this.toJSON().keys();
    }
}