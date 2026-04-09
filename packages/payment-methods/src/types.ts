/**
 * Payment Method types matching Afriex Business API
 */

export type PaymentChannel =
  | "BANK_ACCOUNT"
  | "SWIFT"
  | "MOBILE_MONEY"
  | "UPI"
  | "INTERAC"
  | "WE_CHAT"|"ALIPAY"|"PAYBILL_TILL";

export interface PaymentMethodInstitution {
  institutionId?: string;
  institutionName?: string;
  institutionCode?: string;
  institutionAddress?: string;
}

export interface PaymentMethodRecipient {
  recipientEmail?: string;
  recipientPhone?: string;
  recipientAddress?: string;
  recipientName?: string;
}

export interface PaymentMethodTransaction {
  transactionInvoice?: string;
  transactionNarration?: string;
}

export interface PaymentMethod {
  paymentMethodId: string;
  customerId: string;
  institution?: PaymentMethodInstitution;
  transaction?: PaymentMethodTransaction;
  recipient?: PaymentMethodRecipient;
  channel: PaymentChannel;
  countryCode: string;
  accountName: string;
  accountNumber: string;
  meta?: Record<string, unknown>;
}

export interface CreatePaymentMethodRequest {
  channel: PaymentChannel;
  /**
   *The capability of this payment method. `DEPOSIT` means funds can be pulled from this method (e.g. charge/collect from the customer). `WITHDRAW` means funds can be sent to this method (e.g. pay out to the customer). If omitted, defaults to `WITHDRAW`.
   */
  type?: "WITHDRAW" | "DEPOSIT";
  customerId: string;
  accountName: string;
  accountNumber: string;
  countryCode: string;
  institution: PaymentMethodInstitution;
  recipient?: PaymentMethodRecipient;
  transaction?: PaymentMethodTransaction;
}

export interface ListPaymentMethodsParams {
  page?: number;
  limit?: number;
}

export interface PaymentMethodListResponse {
  data: PaymentMethod[];
  page: number;
  total: number;
}

export interface Institution {
  institutionId: string;
  institutionName: string;
  institutionCode: string;
  institutionAddress?: string;
}

export interface ResolveAccountResponse {
  recipientEmail?: string;
  recipientPhone?: string;
  recipientAddress?: string;
  recipientName?: string;
}
export interface InstitutionCodesResponse {
  bankName: string;
}

export interface GetInstitutionsParams {
  channel: PaymentChannel;
  countryCode: string;
}

export interface ResolveAccountParams {
  channel: "MOBILE_MONEY" | "BANK_ACCOUNT";
  accountNumber: string;
  institutionCode?: string;
  countryCode: string;
}
export interface InstitutionCodesParams {
  searchTerm: string;
  country: "US";
  codeType: "swift_code" | "routing_number";
}
export interface CryptoWallet {
  address: string;
  network: string;
}

export interface CryptoWalletResponse {
  data: CryptoWallet[];
  total: number;
  page: number;
}

export interface GetCryptoWalletParams {
  asset: "USDT" | "USDC";
  customerId?: string;
}

/**
 * Common parameters for virtual account requests
 */
interface GetVirtualAccountBase {
  /** The 3-letter ISO 4217 currency code for the virtual account */
  currency: "USD" | "NGN" | "GBP" | "EUR" | "KES" & (string & {});
  /** Optional transaction reference */
  reference?: string;
}

/**
 * Standard virtual account — creates or retrieves a dedicated virtual bank account.
 */
interface GetStandardVirtualAccountParams extends GetVirtualAccountBase {
  /** Defaults to `VIRTUAL_ACCOUNT` if omitted */
  type?: "VIRTUAL_ACCOUNT";
  /** Optional transaction amount */
  amount?: number;
  /** Optional customer ID. If not provided, the account is created for the business. */
  customerId?: string;
  /** Optional ISO 3166-1 alpha-2 country code */
  country?: string;
}

/**
 * Pool account — assigns a shared business pool account for the customer's country.
 * `currency`, `country`, `amount`, and `customerId` are all required.
 */
interface GetPoolAccountParams extends GetVirtualAccountBase {
  type: "POOL_ACCOUNT";
  /** ISO 3166-1 alpha-2 country code. Required for pool accounts. */
  country: string;
  /** Transaction amount. Required for pool accounts. */
  amount: number;
  /** Customer ID. Required for pool accounts. */
  customerId: string;
}

/**
 * Parameters for retrieving or creating a virtual account.
 * Use `VIRTUAL_ACCOUNT` (default) for dedicated accounts or `POOL_ACCOUNT` for shared pool accounts.
 */
export type GetVirtualAccountParams =
  | GetStandardVirtualAccountParams
  | GetPoolAccountParams;
