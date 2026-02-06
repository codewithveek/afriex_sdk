export type Currency = 'USD' | 'NGN' | 'GHS' | 'KES' | 'UGX' | 'XOF' | 'EGP' | 'PKR' | 'CAD' | 'GBP' | 'EUR';
export type Country = 'US' | 'CA' | 'GB' | 'NG' | 'GH' | 'KE' | 'UG' | 'CM' | 'CI' | 'EG' | 'ET' | 'PK' | 'FR' | 'DE' | 'IT' | 'ES' | 'IE' | 'NL' | 'RO' | 'BE';
export declare enum TransactionStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    COMPLETED = "completed",
    FAILED = "failed",
    CANCELLED = "cancelled"
}
export declare enum PaymentMethod {
    BANK_ACCOUNT = "bank_account",
    DEBIT_CARD = "debit_card",
    WALLET = "wallet",
    MOBILE_MONEY = "mobile_money"
}
export interface PaginationParams {
    page?: number;
    limit?: number;
    cursor?: string;
}
export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
        nextCursor?: string;
    };
}
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}
export interface Timestamps {
    createdAt: string;
    updatedAt: string;
}
export interface Money {
    amount: number;
    currency: Currency;
}
export interface Address {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country: Country;
}
//# sourceMappingURL=common.d.ts.map