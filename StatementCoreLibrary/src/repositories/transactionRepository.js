import { Transaction } from "~/src/models/transaction";

export class TransactionRepository {
    constructor(baseRepository) {
        this.baseRepository = baseRepository;
        this.fields = Transaction.fields();
    }

    findById(id) {
        const result = this.baseRepository.findByField(fields.id, id);
        return Transaction.parse(result);
    }

    findBetweenDates(start, end) {
        const results = this.baseRepository.findInRange(fields.entryDate, start, end);
        return results.map(result => Transaction.parse(result));
    }

    add(transaction) {
        this.baseRepository.add(transaction);
    }

    addRange(transactions) {
        this.baseRepository.addRange(transactions);
    }
}