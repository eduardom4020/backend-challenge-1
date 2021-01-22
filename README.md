# DieselBank - Backend Challenge

A digital wallet is an app that allows you to perform cash-in and cash-out operations using a lot of different methods. For instance, Bino's digital wallet allows you to perform cash-ins by receiving a PIX or by paying a deposit-boleto, and to perform cash-outs by paying bills, paying with your card or transferring money by PIX, TED.
Sometimes, these methods are provided by different sources. Therefore, the user will have a lot of different statements, but in the app, only a single balance and single statement containing all cash-ins and cash-outs will be available for simplicity!

A very common process in a financial institution is called statement reconciliation. The objective is to assert that the balance and statement of any user is always correct and up-to-date. 

As a member of Bino's Software Engineering team, you were assigned the task to implement a statement reconciliation algorithm that will be triggered by a webhook when a new cash-in or cash-out entry is inserted in any of the user's statements, and also by a cron job, fired every minute, as a redundancy measure, once the providers webhooks can't be 100% trusted.

**The webhook is just an alert, and won't provide any meaningful information about a transaction.**

**Both the webhook and cronjob will just execute the same reconciliation algorithm (trigger the same function that you'll write).**

**Every time a transaction entry is inserted in Bino's user statement, the balance should be updated at the same time.**

### Premises:
- Webhooks can be fired multiple times for a single transaction (at-least-once delivery)
- Both cronjobs and webhooks can run concurrently
- Every provider has the capability of making cashins and cashouts of any type.

### For simplicity, let's assume that:
- There is only one user.
- There are only 2 providers.
- All cash-out operations will be authorized, don't worry about the user's balance getting negative.
- The reconciliation algorithm must search for non-reconciled transactions in a 48-hours window.

**The indicator of success of your algorithm will be the result of the unit tests that you must create.**

This is the model of a transaction entry (use this model for the providers and Bino statements) :

```json
[
  {
    "transaction-id": "{{UUID}}",
    "description": "CASH{{IN|OUT}} VIA {{TYPE}}",
    "transaction-type": "PIX|CARD",
    "entry-date": "yyyy-MM-dd'T'HH:mm:ss",
    "amount": 1000,
    "type": "CREDIT|DEBIT" // obs: CARD transactions are only DEBIT
  }
]
```

This is the model of a webhook notification:
```json
{
  "message": "new transaction for you and only you" // useless message, just an alert
}
```

This is the model of the single user (shared resource):
```json
{
  "balance": 0
}
```

## Obs:
- You can use any language that support multi-threading. Feel free to modularize your code, choose any design pattern you prefer.
- Implement any unit tests you deem necessary, but assert that no statement entries will be duplicated and the balance will still be the correct one even with the concurrency access/writing, of multiple threads executing the reconciliation algorithm, on Bino's statement/balance.
- Create a repository and share with us when you are done.
- Provide instructions to setup and run your project unit tests locally in a READ-ME file.
- Good coding! Have fun and show us what you got! :)
