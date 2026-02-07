# @afriex/transactions

Transaction service for the Afriex SDK. Create and track international money transfers.

## Installation

```bash
npm install @afriex/transactions @afriex/core
# or
pnpm add @afriex/transactions @afriex/core
```

## Usage

```typescript
import { AfriexClient } from '@afriex/core';
import { TransactionService } from '@afriex/transactions';

const client = new AfriexClient({
    apiKey: 'your-api-key',
    apiSecret: 'your-api-secret'
});

const transactions = new TransactionService(client);

// Create a transaction
const tx = await transactions.create({
    customerId: 'customer-id',
    amount: 100,
    sourceCurrency: 'USD',
    destinationCurrency: 'NGN',
    paymentMethodId: 'payment-method-id'
});

// Get a transaction
const tx = await transactions.get('transaction-id');

// List transactions
const { data, pagination } = await transactions.list({
    customerId: 'customer-id',
    limit: 10
});
```

## API Reference

### `create(data)`
Create a new transaction.

### `get(transactionId)`
Retrieve a transaction by ID.

### `list(params?)`
List transactions with optional filters for customer, status, date range.

## Transaction Statuses

- `pending` - Transaction is being processed
- `completed` - Transaction completed successfully
- `failed` - Transaction failed
- `cancelled` - Transaction was cancelled

## License

MIT
