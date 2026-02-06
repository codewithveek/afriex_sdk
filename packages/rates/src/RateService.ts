import { HttpClient, ValidationError, Currency } from '@afriex/core';
import { ExchangeRate, GetRateRequest, ConversionResult } from './types';

export class RateService {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    /**
     * Get exchange rate between two currencies
     */
    async getRate(request: GetRateRequest): Promise<ExchangeRate> {
        if (!request.sourceCurrency || !request.destinationCurrency) {
            throw new ValidationError('Source and destination currencies are required');
        }

        return this.httpClient.get<ExchangeRate>('/v1/rates', {
            params: {
                from: request.sourceCurrency,
                to: request.destinationCurrency,
            },
        });
    }

    /**
     * Convert amount from one currency to another
     */
    async convert(request: GetRateRequest): Promise<ConversionResult> {
        if (!request.sourceCurrency || !request.destinationCurrency) {
            throw new ValidationError('Source and destination currencies are required');
        }

        if (!request.amount || request.amount <= 0) {
            throw new ValidationError('Amount must be greater than 0');
        }

        return this.httpClient.get<ConversionResult>('/v1/rates/convert', {
            params: {
                from: request.sourceCurrency,
                to: request.destinationCurrency,
                amount: request.amount,
            },
        });
    }

    /**
     * Get all available exchange rates
     */
    async getAllRates(baseCurrency?: Currency): Promise<ExchangeRate[]> {
        const response = await this.httpClient.get<{ data: ExchangeRate[] }>(
            '/v1/rates/all',
            {
                params: baseCurrency ? { base: baseCurrency } : undefined,
            }
        );

        return response.data;
    }
}
