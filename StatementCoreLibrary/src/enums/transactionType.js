const PIX_ID = 'PIX';
const DEPOSIT_BOLETO_ID = 'BOLETO';
const BILL_PAYMENT_ID = 'BILL';
const CARD_PAYMENT_ID = 'CARD';
const TED_ID = 'TED';

const enumerator = {
    [PIX_ID]: { id: PIX_ID, name: 'Pix' },
    [DEPOSIT_BOLETO_ID]: { id: DEPOSIT_BOLETO_ID, name: 'Deposit Boleto' },
    [BILL_PAYMENT_ID]: { id: BILL_PAYMENT_ID, name: 'Bill Payment' },
    [CARD_PAYMENT_ID]: { id: CARD_PAYMENT_ID, name: 'Card Payment' },
    [TED_ID]: { id: TED_ID, name: 'TED' }
}

export const TransactionType = Object.freeze(enumerator);