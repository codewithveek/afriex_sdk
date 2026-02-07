# @afriex/webhooks

Webhook verification for the Afriex SDK. Verify and parse webhook signatures.

## Installation

```bash
npm install @afriex/webhooks
# or
pnpm add @afriex/webhooks
```

## Usage

```typescript
import { WebhookVerifier } from '@afriex/webhooks';

const verifier = new WebhookVerifier('your-webhook-public-key');

// Verify a webhook signature
const isValid = verifier.verify(payload, signature);

// Verify and parse webhook payload
const event = verifier.verifyAndParse(payload, signature);
if (event) {
    console.log('Event type:', event.type);
    console.log('Event data:', event.data);
}
```

### Express.js Example

```typescript
import express from 'express';
import { WebhookVerifier } from '@afriex/webhooks';

const app = express();
const verifier = new WebhookVerifier(process.env.AFRIEX_WEBHOOK_PUBLIC_KEY);

app.post('/webhooks/afriex', express.raw({ type: 'application/json' }), (req, res) => {
    const signature = req.headers['x-afriex-signature'] as string;
    const payload = req.body.toString();

    const event = verifier.verifyAndParse(payload, signature);
    
    if (!event) {
        return res.status(401).send('Invalid signature');
    }

    switch (event.type) {
        case 'transaction.completed':
            // Handle completed transaction
            break;
        case 'transaction.failed':
            // Handle failed transaction
            break;
        case 'customer.created':
            // Handle new customer
            break;
    }

    res.status(200).send('OK');
});
```

## Webhook Event Types

- `transaction.completed` - Transaction completed successfully
- `transaction.failed` - Transaction failed
- `transaction.pending` - Transaction is pending
- `customer.created` - New customer created
- `customer.updated` - Customer updated
- `payment_method.created` - Payment method added
- `payment_method.deleted` - Payment method removed

## API Reference

### `verify(payload, signature)`
Verify a webhook signature.

**Parameters:**
- `payload`: Raw webhook payload string
- `signature`: Signature from `x-afriex-signature` header

**Returns:** `boolean` - Whether signature is valid

### `verifyAndParse(payload, signature)`
Verify signature and parse the webhook event.

**Parameters:**
- `payload`: Raw webhook payload string
- `signature`: Signature from `x-afriex-signature` header

**Returns:** `WebhookEvent | null` - Parsed event or null if invalid

## License

MIT
