const CASH_IN_ID = 'CREDIT';
const CASH_OUT_ID = 'DEBIT';

const enumerator = {
    [CASH_IN_ID]: { id: CASH_IN_ID, name: 'Cash In' },
    [CASH_OUT_ID]: { id: CASH_IN_ID, name: 'Cash Out' }
}

export const CashType = Object.freeze(enumerator);