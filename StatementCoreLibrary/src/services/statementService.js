import { Transaction } from '~/src/models/transaction';
import { TransactionRepository } from '~/src/repositories/transactionRepository';
import moment from 'moment';

export class StatementService {
    constructor(statementRepository) {
        this.transactionRepository = new TransactionRepository(statementRepository);
    }

    findById(id) {
        return this.transactionRepository.findById(id);
    }

    create(cashType, transactionType, amount) {
        const transaction = new Transaction(cashType, transactionType, amount);
        return this.transactionRepository.add(transaction);
    }

    listBetween(start, end) {
        return this.transactionRepository.findBetweenDates(start, end);
    }

    listTimewindow(strEnd, hours) {
        const strStart = moment(strEnd).subtract(hours, 'hours').toISOString();

        return this.transactionRepository.findBetweenDates(strStart, strEnd);
    }

    listTimewindowFromNow(hours) {
        const now = new Date();
        const strNow = now.toISOString();

        this.listTimewindow(strNow, hours);
    }
}