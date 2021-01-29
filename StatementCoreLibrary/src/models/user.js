const BALANCE_KEY = 'balance';

export class User {
    constructor(balance=null) {
        if(balance !== null)
            this.balance = balance;
    }

    toJSON() {
        return { [BALANCE_KEY]: this.balance };
    }

    static parse(json) {
        const user = new User();
        user.balance = json[BALANCE_KEY];

        return user;
    }

    static fields() {
        return {
            balance: BALANCE_KEY
        };
    }
}