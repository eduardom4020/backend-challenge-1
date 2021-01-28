export class Notification {
    constructor(message) {
        this.message = message;
    }

    toJSON() {
        return { message: this.message };
    }

    getFields() {
        this.toJSON().keys();
    }
}