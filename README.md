# Afriex TypeScript SDK

Official TypeScript SDK for the Afriex Business API.

## Installation

```bash
npm install @afriex/sdk
# or
yarn add @afriex/sdk
# or
pnpm add @afriex/sdk
```

## Quick Start

```typescript
import { AfriexSDK, Environment } from "@afriex/sdk";

const afriex = new AfriexSDK({
  apiKey: "your-api-key",
  environment: Environment.PRODUCTION,
});

// Send money
const transfer = await afriex.transfers.create({
  type: "bank",
  amount: 100,
  sourceCurrency: "USD",
  destinationCurrency: "NGN",
  destinationCountry: "NG",
  bankDetails: {
    bankCode: "044",
    accountNumber: "1234567890",
    accountName: "John Doe",
  },
});

console.log("Transfer ID:", transfer.id);
```

## Features

- Type-safe API with full TypeScript support
- Comprehensive error handling
- Automatic retry logic for transient failures
- Webhook signature verification
- Rate limiting support
- Tree-shakable modular design
- Production-ready

## API Reference

### Transfers

```typescript
// Get a quote
const quote = await afriex.transfers.getQuote({
  amount: 100,
  sourceCurrency: 'USD',
  destinationCurrency: 'NGN',
  destinationCountry: 'NG',
});

// Create a transfer
const transfer = await afriex.transfers.create({...});

// Get a transfer
const transfer = await afriex.transfers.get('transfer_id');

// List transfers
const transfers = await afriex.transfers.list({ page: 1, limit: 10 });

// Cancel a transfer
await afriex.transfers.cancel('transfer_id');
```

### Wallets

```typescript
// Create a wallet
const wallet = await afriex.wallets.create({
  type: "business",
  currency: "USD",
});

// Get balance
const balance = await afriex.wallets.getBalance("wallet_id");

// Fund wallet
await afriex.wallets.fund({
  walletId: "wallet_id",
  amount: 1000,
  paymentMethod: "bank_account",
});
```

### Recipients

```typescript
// Create a recipient
const recipient = await afriex.recipients.create({
  firstName: "John",
  lastName: "Doe",
  country: "NG",
  currency: "NGN",
  bankDetails: {
    bankCode: "044",
    accountNumber: "1234567890",
    accountName: "John Doe",
  },
});
```

### Exchange Rates

```typescript
// Get exchange rate
const rate = await afriex.rates.getRate({
  sourceCurrency: "USD",
  destinationCurrency: "NGN",
});

// Convert amount
const result = await afriex.rates.convert({
  sourceCurrency: "USD",
  destinationCurrency: "NGN",
  amount: 100,
});
```

### Banks

```typescript
// List banks by country
const banks = await afriex.banks.listBanks("NG");

// Verify bank account
const result = await afriex.banks.verifyAccount({
  bankCode: "044",
  accountNumber: "1234567890",
  country: "NG",
});
```

### Webhooks

```typescript
// Configure webhook secret
const afriex = new AfriexSDK({
  apiKey: "your-api-key",
  webhookSecret: "your-webhook-secret",
});

// Verify webhook payload
const payload = afriex.webhooks.verifyAndParse(rawBody, signature, timestamp);
```

## Error Handling

```typescript
import { AfriexSDK, ApiError, ValidationError, RateLimitError } from '@afriex/sdk';

try {
  await afriex.transfers.create({...});
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry after ${error.retryAfter} seconds`);
  } else if (error instanceof ApiError) {
    console.error('API Error:', error.message, error.errorCode);
  } else if (error instanceof ValidationError) {
    console.error('Validation Error:', error.fields);
  }
}
```

## Configuration Options

```typescript
const afriex = new AfriexSDK({
  apiKey: "your-api-key",
  environment: Environment.PRODUCTION, // or Environment.STAGING
  enableLogging: true,
  logLevel: LogLevel.DEBUG,
  retryConfig: {
    maxRetries: 5,
    retryDelay: 2000,
    retryableStatusCodes: [408, 429, 500, 502, 503, 504],
  },
  webhookSecret: "your-webhook-secret",
});
```

## License

MIT
