import { Transaction } from "~/src/models/transaction";

export class TransactionRepository {
    constructor(baseRepository) {
        this.baseRepository = baseRepository;
        this.fields = Transaction.fields();
    }

    findById(id) {
        const result = this.baseRepository.findByField(this.fields.id, id);
        return Transaction.parse(result);
    }

    findBetweenDates(start, end) {
        return this.baseRepository.findInRange(this.fields.entryDate, start, end)
            .then(results => results.map(result => Transaction.parse(result)))
            .catch(err => console.err(err) || []);
    }

    add(transaction) {
        this.baseRepository.add(transaction);
    }

    addRange(transactions) {
        this.baseRepository.addRange(transactions);
    }
}