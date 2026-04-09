# @afriex/payment-methods

## 1.1.0 (2026-04-09)

### Breaking Changes

- **`GetVirtualAccountParams`** is now a discriminated union type:
  - `GetStandardVirtualAccountParams` — `type?: "VIRTUAL_ACCOUNT"`, all fields optional
  - `GetPoolAccountParams` — `type: "POOL_ACCOUNT"`, `country`, `amount`, and `customerId` are required

### Fixes

- Added missing `type`, `country`, and `reference` parameters to virtual account params to match API spec
- Added JSDoc comments to all type fields
