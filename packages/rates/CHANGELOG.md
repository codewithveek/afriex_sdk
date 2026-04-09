# @afriex/rates

## 1.1.0 (2026-04-09)

### Breaking Changes

- **`RatesResponse`** no longer has a `data` wrapper — `rates` and `updatedAt` are now top-level fields
  - Before: `response.data.rates`, `response.data.updatedAt`
  - After: `response.rates`, `response.updatedAt`

### Fixes

- `RateService.getRates()` now correctly unwraps the API `{ data }` envelope, consistent with all other services
- `RateService.getRate()` updated to use unwrapped response
- Added JSDoc comments to `RatesResponse` and `GetRatesParams` fields
