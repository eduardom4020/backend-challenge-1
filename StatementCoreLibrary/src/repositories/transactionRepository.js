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

    add(transaction) {
        this.baseRepository.add(transaction);
    }
}