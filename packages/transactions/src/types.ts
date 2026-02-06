/**
 * Transaction types matching Afriex Business API
 */

export type TransactionType = 'WITHDRAWAL' | 'DEPOSIT';

export type TransactionStatus =
    | 'PENDING'
    | 'PROCESSING'
    | 'COMPLETED'
    | 'FAILED'
    | 'CANCELLED'
    | 'SUCCESS'
    | 'REFUNDED'
    | 'RETRY'
    | 'UNKNOWN'
    | 'REJECTED'
    | 'IN_REVIEW';

export interface TransactionMeta {
    narration?: string;
    invoice?: string;
    idempotencyKey?: string;
    merchantId: string;
}

export interface Transaction {
    transactionId: string;
    customerId: string;
    destinationId: string;
    sourceAmount: string;
    sourceCurrency: string;
    destinationAmount: string;
    destinationCurrency: string;
    type: TransactionType;
    status: TransactionStatus;
    meta?: TransactionMeta;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTransactionRequest {
    customerId: string;
    destinationAmount: number | string;
    destinationCurrency: string;
    sourceCurrency: string;
    destinationId: string;
    meta?: TransactionMeta;
}

export interface ListTransactionsParams {
    page?: number;
    limit?: number;
}

export interface TransactionListResponse {
    data: Transaction[];
    page: number;
    total: number;
}
