import axios from 'axios';

const PROVIDER_1_ADDRESS = process.env.PROVIDER_1_ADDRESS;
const PROVIDER_2_ADDRESS = process.env.PROVIDER_2_ADDRESS;

export const CashOperation = (cashType) => async (ctx, _) => {
    const operation = cashType.id.toLowerCase();
    const postTo = Math.random() >= .5 ? `http://${PROVIDER_1_ADDRESS}/${operation}` : `http://${PROVIDER_2_ADDRESS}/${operation}`;
    
    const { message, status } = await axios.post(postTo, ctx.request.body, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => ({
        message: `${cashType.name} sent to ${postTo}`,
        status: 200
    })).catch(e => ({
        message: `Not Treated Error\n${e.toString()}`,
        status: 500
    }));

    if(status === 200) ctx.body = message;
    else ctx.throw(status, message);
}