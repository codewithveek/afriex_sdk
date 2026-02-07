# @afriex/balance

Balance service for the Afriex SDK. Query organization wallet balances.

## Installation

```bash
npm install @afriex/balance @afriex/core
# or
pnpm add @afriex/balance @afriex/core
```

## Usage

```typescript
import { AfriexClient } from '@afriex/core';
import { BalanceService } from '@afriex/balance';

const client = new AfriexClient({
    apiKey: 'your-api-key',
    apiSecret: 'your-api-secret'
});

const balance = new BalanceService(client);

// Get all balances
const balances = await balance.getBalance();
// Returns: { USD: '1000.00', NGN: '500000.00', ... }

// Get balance for specific currencies
const balances = await balance.getBalance(['USD', 'NGN']);

// Get balance for a single currency
const usdBalance = await balance.getBalanceForCurrency('USD');
// Returns: '1000.00'
```

## API Reference

### `getBalance(currencies?)`
Get balances for all currencies or specific currencies.

**Parameters:**
- `currencies` (optional): Array of currency codes to filter

**Returns:** `Record<string, string>` - Currency code to balance mapping

### `getBalanceForCurrency(currency)`
Get balance for a single currency.

**Parameters:**
- `currency`: Currency code (e.g., 'USD', 'NGN')

**Returns:** `string` - Balance amount

## License

MIT
