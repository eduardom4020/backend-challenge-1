const MESSAGE_KEY = 'message';

export class Notification {
    constructor(message=null) {
        if(message !== null)
            this.message = message;
    }

    toJSON() {
        return { [MESSAGE_KEY]: this.message };
    }

    static parse(json) {
        const notification = new Notification();
        notification.message = json[MESSAGE_KEY];

        return notification;
    }

    static fields() {
        return {
            message: MESSAGE_KEY
        };
    }
}