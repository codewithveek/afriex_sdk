# @afriex/rates

Exchange rate service for the Afriex SDK. Get real-time exchange rates and perform currency conversions.

## Installation

```bash
npm install @afriex/rates @afriex/core
# or
pnpm add @afriex/rates @afriex/core
```

## Usage

```typescript
import { AfriexClient } from '@afriex/core';
import { RateService } from '@afriex/rates';

const client = new AfriexClient({
    apiKey: 'your-api-key',
    apiSecret: 'your-api-secret'
});

const rates = new RateService(client);

// Get all rates
const allRates = await rates.getRates();

// Get rates for specific currencies
const usdRates = await rates.getRates({
    base: 'USD',
    symbols: ['NGN', 'GHS', 'KES']
});

// Get a single rate
const rate = await rates.getRate('USD', 'NGN');
// Returns: '1550.00'

// Convert amount
const result = await rates.convert({
    from: 'USD',
    to: 'NGN',
    amount: 100
});
// Returns: { from: 'USD', to: 'NGN', amount: 100, result: 155000, rate: '1550.00' }
```

## API Reference

### `getRates(params?)`
Get exchange rates.

**Parameters:**
- `base` (optional): Base currency or array of currencies
- `symbols` (optional): Target currency or array of currencies

### `getRate(from, to)`
Get a single exchange rate.

**Parameters:**
- `from`: Source currency code
- `to`: Target currency code

**Returns:** `string` - Exchange rate

### `convert(params)`
Convert an amount between currencies.

**Parameters:**
- `from`: Source currency code
- `to`: Target currency code
- `amount`: Amount to convert

**Returns:** Conversion result with rate and converted amount

## License

MIT
