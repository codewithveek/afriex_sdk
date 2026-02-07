# @afriex/customers

Customer management service for the Afriex SDK. Create, retrieve, update, and manage customer KYC.

## Installation

```bash
npm install @afriex/customers @afriex/core
# or
pnpm add @afriex/customers @afriex/core
```

## Usage

```typescript
import { AfriexClient } from '@afriex/core';
import { CustomerService } from '@afriex/customers';

const client = new AfriexClient({
    apiKey: 'your-api-key',
    apiSecret: 'your-api-secret'
});

const customers = new CustomerService(client);

// Create a customer
const customer = await customers.create({
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890'
});

// Get a customer
const customer = await customers.get('customer-id');

// List customers
const { data, pagination } = await customers.list({ limit: 10 });

// Update KYC
await customers.updateKyc('customer-id', {
    documentType: 'passport',
    documentNumber: 'AB123456'
});
```

## API Reference

### `create(data)`
Create a new customer.

### `get(customerId)`
Retrieve a customer by ID.

### `list(params?)`
List all customers with optional pagination.

### `delete(customerId)`
Delete a customer.

### `updateKyc(customerId, kycData)`
Update customer KYC information.

## License

MIT
