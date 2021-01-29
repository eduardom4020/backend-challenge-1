import axios from 'axios';
import { models } from 'bino_bank_statement_core_library';

const FAILURE_PROBABILITY = 30;
const WEBHOOK_ENDPOINT = `http://${process.env.WEBHOOK_ADDRESS}/reconciliate`;

const someTimesIWillBreak = probability => 1 - Math.random() <= (probability / 100);

export const callWebhook = () => {
    if(!someTimesIWillBreak(FAILURE_PROBABILITY)) {
        setTimeout(() => {
            const notification = new models.Notification('New statement arrived!');
            axios.post(WEBHOOK_ENDPOINT, notification.toJSON())
                .then(() => console.log('Webhook sent.'));
        }, 200);
    } else {
        console.log('Webhook failed to be sent.')
    }
    
}