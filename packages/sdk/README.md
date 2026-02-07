# @afriex/sdk

Official TypeScript SDK for the Afriex Business API. A unified interface for all Afriex services.

## Installation

```bash
npm install @afriex/sdk
# or
pnpm add @afriex/sdk
```

## Quick Start

```typescript
import { Afriex } from '@afriex/sdk';

const afriex = new Afriex({
    apiKey: 'your-api-key',
    apiSecret: 'your-api-secret',
    environment: 'sandbox', // or 'production'
    webhookPublicKey: 'your-webhook-public-key' // optional
});

// Customers
const customer = await afriex.customers.create({
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe'
});

// Payment Methods
const paymentMethod = await afriex.paymentMethods.create({
    customerId: customer.id,
    type: 'bank',
    accountNumber: '1234567890',
    bankCode: 'GTB',
    currency: 'NGN'
});

// Transactions
const transaction = await afriex.transactions.create({
    customerId: customer.id,
    amount: 100,
    sourceCurrency: 'USD',
    destinationCurrency: 'NGN',
    paymentMethodId: paymentMethod.id
});

// Rates
const rate = await afriex.rates.getRate('USD', 'NGN');

// Balance
const balances = await afriex.balance.getBalance();

// Webhook Verification
const isValid = afriex.webhooks.verify(payload, signature);
```

## Available Services

| Service                 | Description                                  |
| ----------------------- | -------------------------------------------- |
| `afriex.customers`      | Customer CRUD and KYC management             |
| `afriex.transactions`   | Create and track transactions                |
| `afriex.paymentMethods` | Bank, mobile money, crypto, virtual accounts |
| `afriex.balance`        | Organization wallet balances                 |
| `afriex.rates`          | Exchange rates and conversions               |
| `afriex.webhooks`       | Webhook signature verification               |

## Configuration

```typescript
const afriex = new Afriex({
    apiKey: 'your-api-key',        // Required
    apiSecret: 'your-api-secret',  // Required
    environment: 'sandbox',        // 'sandbox' | 'production' (default: 'sandbox')
    webhookPublicKey: 'key',       // Optional - for webhook verification
    timeout: 30000,                // Optional - request timeout in ms
});
```

## Individual Packages

You can also install individual packages for smaller bundle sizes:

- `@afriex/core` - Base client and configuration
- `@afriex/customers` - Customer management
- `@afriex/transactions` - Transaction handling
- `@afriex/payment-methods` - Payment methods
- `@afriex/balance` - Balance queries
- `@afriex/rates` - Exchange rates
- `@afriex/webhooks` - Webhook verification

## Documentation

Full documentation available at [afriex-sdk-docs.vercel.app](https://afriex-sdk-docs.vercel.app)

## License

MIT
