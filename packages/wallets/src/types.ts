import {
    Currency,
    Money,
    Timestamps,
    PaginationParams,
    TransactionStatus,
} from '@afriex/core';

export enum WalletType {
    PERSONAL = 'personal',
    BUSINESS = 'business',
}

export interface Wallet extends Timestamps {
    id: string;
    type: WalletType;
    currency: Currency;
    balance: Money;
    availableBalance: Money;
    status: 'active' | 'frozen' | 'closed';
}

export interface CreateWalletRequest {
    type: WalletType;
    currency: Currency;
}

export interface WalletTransaction extends Timestamps {
    id: string;
    walletId: string;
    type: 'credit' | 'debit';
    amount: Money;
    balance: Money;
    status: TransactionStatus;
    description: string;
    reference: string;
    metadata?: Record<string, unknown>;
}

export interface ListWalletTransactionsParams extends PaginationParams {
    startDate?: string;
    endDate?: string;
    type?: 'credit' | 'debit';
}

export interface FundWalletRequest {
    walletId: string;
    amount: number;
    paymentMethod: 'bank_account' | 'debit_card';
    paymentMethodId?: string;
}

export interface WithdrawFromWalletRequest {
    walletId: string;
    amount: number;
    destinationType: 'bank_account' | 'debit_card';
    destinationId: string;
}
