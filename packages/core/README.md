# @afriex/core

Core functionality for the Afriex SDK including HTTP client, configuration, and error handling.

## Installation

```bash
npm install @afriex/core
# or
pnpm add @afriex/core
```

## Usage

This package provides the base client and utilities used by other Afriex SDK packages.

```typescript
import { AfriexClient, AfriexConfig } from '@afriex/core';

const client = new AfriexClient({
    apiKey: 'your-api-key',
    apiSecret: 'your-api-secret',
    environment: 'sandbox' // or 'production'
});

// Access the HTTP client for requests
const httpClient = client.getHttpClient();

// Access configuration
const config = client.getConfig();
```

## Configuration Options

| Option        | Type                          | Required | Description                            |
| ------------- | ----------------------------- | -------- | -------------------------------------- |
| `apiKey`      | string                        | Yes      | Your Afriex API key                    |
| `apiSecret`   | string                        | Yes      | Your Afriex API secret                 |
| `environment` | `'sandbox'` \| `'production'` | No       | API environment (default: `'sandbox'`) |

## Exports

- `AfriexClient` - Base client class
- `HttpClient` - HTTP client for API requests
- `Config` - Configuration class
- `AfriexConfig` - Configuration interface
- `ValidationError` - Validation error class
- `AfriexError` - Base error class

## License

MIT
