import { Country } from '@afriex/core';

export interface Bank {
    code: string;
    name: string;
    country: Country;
}

export interface BankAccount {
    bankCode: string;
    accountNumber: string;
    accountName: string;
}

export interface VerifyBankAccountRequest {
    bankCode: string;
    accountNumber: string;
    country: Country;
}

export interface VerifyBankAccountResponse {
    accountNumber: string;
    accountName: string;
    bankCode: string;
    bankName: string;
    isValid: boolean;
}
