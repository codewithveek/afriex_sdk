import {
    Currency,
    Country,
    TransactionStatus,
    Money,
    Timestamps,
    PaginationParams,
} from '@afriex/core';

export enum TransferType {
    BANK = 'bank',
    MOBILE_MONEY = 'mobile_money',
    WALLET = 'wallet',
}

export interface BankDetails {
    bankCode: string;
    accountNumber: string;
    accountName: string;
}

export interface MobileMoneyDetails {
    provider: string;
    phoneNumber: string;
}

export interface CreateTransferRequest {
    recipientId?: string;
    type: TransferType;
    amount: number;
    sourceCurrency: Currency;
    destinationCurrency: Currency;
    destinationCountry: Country;
    bankDetails?: BankDetails;
    mobileMoneyDetails?: MobileMoneyDetails;
    walletId?: string;
    reference?: string;
    purpose?: string;
    metadata?: Record<string, unknown>;
}

export interface Transfer extends Timestamps {
    id: string;
    reference: string;
    type: TransferType;
    status: TransactionStatus;
    amount: Money;
    sourceAmount: Money;
    destinationAmount: Money;
    exchangeRate: number;
    fee: Money;
    recipientId?: string;
    bankDetails?: BankDetails;
    mobileMoneyDetails?: MobileMoneyDetails;
    walletId?: string;
    purpose?: string;
    metadata?: Record<string, unknown>;
    failureReason?: string;
}

export interface TransferQuoteRequest {
    amount: number;
    sourceCurrency: Currency;
    destinationCurrency: Currency;
    destinationCountry: Country;
}

export interface TransferQuote {
    sourceAmount: Money;
    destinationAmount: Money;
    exchangeRate: number;
    fee: Money;
    totalAmount: Money;
    expiresAt: string;
}

export interface ListTransfersParams extends PaginationParams {
    status?: TransactionStatus;
    startDate?: string;
    endDate?: string;
    recipientId?: string;
}
