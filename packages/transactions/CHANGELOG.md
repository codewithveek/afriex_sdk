# @afriex/transactions

## 1.1.0 (2026-04-09)

### Breaking Changes

- **`CreateTransactionRequest`** is now a discriminated union type instead of a flat interface:
  - `CreateWithdrawTransaction` — `type?: "WITHDRAW"`, requires `destinationId`
  - `CreateDepositTransaction` — `type: "DEPOSIT"`, requires `sourceId`
  - `CreateSwapTransaction` — `type: "SWAP"`, both `sourceId` and `destinationId` optional
- `sourceAmount` is now a required field for all transaction types
- `destinationId` is no longer always required — only for `WITHDRAW` transactions

### Fixes

- Added missing `sourceAmount` and `type` fields to match API spec
- Added missing `sourceId` field for `DEPOSIT` transactions
- Validation now conditionally checks `destinationId` (WITHDRAW) and `sourceId` (DEPOSIT) based on transaction type
- Added JSDoc comments to all type fields
