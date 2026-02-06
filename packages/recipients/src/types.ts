import {
    Country,
    Currency,
    Timestamps,
    PaginationParams,
} from '@afriex/core';

export interface Recipient extends Timestamps {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber?: string;
    country: Country;
    currency: Currency;
    bankDetails?: {
        bankCode: string;
        accountNumber: string;
        accountName: string;
    };
    mobileMoneyDetails?: {
        provider: string;
        phoneNumber: string;
    };
    metadata?: Record<string, unknown>;
}

export interface CreateRecipientRequest {
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber?: string;
    country: Country;
    currency: Currency;
    bankDetails?: {
        bankCode: string;
        accountNumber: string;
        accountName: string;
    };
    mobileMoneyDetails?: {
        provider: string;
        phoneNumber: string;
    };
    metadata?: Record<string, unknown>;
}

export interface UpdateRecipientRequest {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    metadata?: Record<string, unknown>;
}

export interface ListRecipientsParams extends PaginationParams {
    country?: Country;
    search?: string;
}
