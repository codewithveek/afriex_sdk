# @afriex/payment-methods

Payment method service for the Afriex SDK. Manage bank accounts, mobile money, crypto wallets, and virtual accounts.

## Installation

```bash
npm install @afriex/payment-methods @afriex/core
# or
pnpm add @afriex/payment-methods @afriex/core
```

## Usage

```typescript
import { AfriexClient } from '@afriex/core';
import { PaymentMethodService } from '@afriex/payment-methods';

const client = new AfriexClient({
    apiKey: 'your-api-key',
    apiSecret: 'your-api-secret'
});

const paymentMethods = new PaymentMethodService(client);

// Create a bank payment method
const bank = await paymentMethods.create({
    customerId: 'customer-id',
    type: 'bank',
    accountNumber: '1234567890',
    bankCode: 'GTB',
    currency: 'NGN'
});

// List payment methods
const methods = await paymentMethods.list('customer-id');

// Get supported institutions
const banks = await paymentMethods.getInstitutions('NGN', 'bank');

// Resolve account details
const account = await paymentMethods.resolveAccount({
    accountNumber: '1234567890',
    bankCode: 'GTB'
});

// Get crypto deposit address
const address = await paymentMethods.getCryptoAddress('customer-id', 'BTC');

// Create virtual account
const virtualAccount = await paymentMethods.createVirtualAccount({
    customerId: 'customer-id',
    currency: 'NGN'
});
```

## Payment Method Types

- `bank` - Bank account
- `mobile_money` - Mobile money wallet
- `crypto` - Cryptocurrency wallet
- `virtual_account` - Virtual bank account

## API Reference

### `create(data)`
Create a new payment method.

### `get(paymentMethodId)`
Retrieve a payment method by ID.

### `list(customerId)`
List all payment methods for a customer.

### `delete(paymentMethodId)`
Delete a payment method.

### `getInstitutions(currency, type?)`
Get supported financial institutions for a currency.

### `resolveAccount(data)`
Resolve and verify account details.

### `getCryptoAddress(customerId, currency)`
Get crypto deposit address.

### `createVirtualAccount(data)`
Create a virtual account.

## License

MIT
