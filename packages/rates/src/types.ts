import { Currency } from '@afriex/core';

export interface ExchangeRate {
    sourceCurrency: Currency;
    destinationCurrency: Currency;
    rate: number;
    inverseRate: number;
    timestamp: string;
}

export interface GetRateRequest {
    sourceCurrency: Currency;
    destinationCurrency: Currency;
    amount?: number;
}

export interface ConversionResult {
    sourceAmount: number;
    destinationAmount: number;
    sourceCurrency: Currency;
    destinationCurrency: Currency;
    rate: number;
    timestamp: string;
}
