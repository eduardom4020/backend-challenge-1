import { Transaction } from '~/src/models/transaction';
import { TransactionRepository } from '~/src/repositories/transactionRepository';

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
}