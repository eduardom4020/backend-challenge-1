const RECONCILIATION_HOURS_WINDOW = 48;

export class ReconciliationService {
    constructor(binoBankStatementService) {
        this.statementProvidersServices = [];
        this.binoBankStatementService = binoBankStatementService;
    }

    attachServices(...services) {
        this.statementProvidersServices = [...this.statementProvidersServices, ...services];
    }

    async reconciliate() {
        const binoBankStatement = await this.binoBankStatementService
            .listTimewindowFromNow(RECONCILIATION_HOURS_WINDOW);

        const binoBankStatementIds = binoBankStatement.map(transaction => transaction.id);

        const providersStatements = await Promise.all(this.statementProvidersServices
            .map(service => service.listTimewindowFromNow(RECONCILIATION_HOURS_WINDOW)));

        const mergedStatement = providersStatements
            .reduce((acc, curr) => ([...acc, ...curr]), [])
            .map(transaction => ({[transaction.id]: transaction}))
            .reduce((acc, curr) => ({...acc, ...curr}), {});

        const mergedStatementIds = [... new Set(Object.keys(mergedStatement))];

        const newTransactionsIds = mergedStatementIds.filter(id => binoBankStatementIds.indexOf(id) === -1);

        const newStatementTransactions = newTransactionsIds
            .map(id => mergedStatement[id])
            .sort((a, b) => new Date(a.entryDate) - new Date(b.entryDate));

        if(newStatementTransactions.length > 0)
            this.binoBankStatementService.injectRange(newStatementTransactions);
    }
}