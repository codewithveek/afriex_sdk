import { HttpClient, ValidationError, PaginatedResponse } from '@afriex/core';
import {
    CreateTransferRequest,
    Transfer,
    TransferQuote,
    TransferQuoteRequest,
    ListTransfersParams,
} from './types';

export class TransferService {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    /**
     * Create a new transfer
     */
    async create(request: CreateTransferRequest): Promise<Transfer> {
        this.validateCreateTransferRequest(request);

        return this.httpClient.post<Transfer>('/v1/transfers', request);
    }

    /**
     * Get a transfer by ID
     */
    async get(transferId: string): Promise<Transfer> {
        if (!transferId) {
            throw new ValidationError('Transfer ID is required');
        }

        return this.httpClient.get<Transfer>(`/v1/transfers/${transferId}`);
    }

    /**
     * List all transfers
     */
    async list(
        params?: ListTransfersParams
    ): Promise<PaginatedResponse<Transfer>> {
        return this.httpClient.get<PaginatedResponse<Transfer>>('/v1/transfers', {
            params,
        });
    }

    /**
     * Get a transfer quote
     */
    async getQuote(request: TransferQuoteRequest): Promise<TransferQuote> {
        this.validateQuoteRequest(request);

        return this.httpClient.post<TransferQuote>('/v1/transfers/quote', request);
    }

    /**
     * Cancel a transfer
     */
    async cancel(transferId: string): Promise<Transfer> {
        if (!transferId) {
            throw new ValidationError('Transfer ID is required');
        }

        return this.httpClient.post<Transfer>(
            `/v1/transfers/${transferId}/cancel`
        );
    }

    private validateCreateTransferRequest(request: CreateTransferRequest): void {
        const errors: Array<{ field: string; message: string }> = [];

        if (!request.type) {
            errors.push({ field: 'type', message: 'Transfer type is required' });
        }

        if (!request.amount || request.amount <= 0) {
            errors.push({
                field: 'amount',
                message: 'Amount must be greater than 0',
            });
        }

        if (!request.sourceCurrency) {
            errors.push({
                field: 'sourceCurrency',
                message: 'Source currency is required',
            });
        }

        if (!request.destinationCurrency) {
            errors.push({
                field: 'destinationCurrency',
                message: 'Destination currency is required',
            });
        }

        if (!request.destinationCountry) {
            errors.push({
                field: 'destinationCountry',
                message: 'Destination country is required',
            });
        }

        if (request.type === 'bank' && !request.bankDetails) {
            errors.push({
                field: 'bankDetails',
                message: 'Bank details are required for bank transfers',
            });
        }

        if (request.type === 'mobile_money' && !request.mobileMoneyDetails) {
            errors.push({
                field: 'mobileMoneyDetails',
                message: 'Mobile money details are required for mobile money transfers',
            });
        }

        if (request.type === 'wallet' && !request.walletId) {
            errors.push({
                field: 'walletId',
                message: 'Wallet ID is required for wallet transfers',
            });
        }

        if (errors.length > 0) {
            throw new ValidationError('Validation failed', errors);
        }
    }

    private validateQuoteRequest(request: TransferQuoteRequest): void {
        const errors: Array<{ field: string; message: string }> = [];

        if (!request.amount || request.amount <= 0) {
            errors.push({
                field: 'amount',
                message: 'Amount must be greater than 0',
            });
        }

        if (!request.sourceCurrency) {
            errors.push({
                field: 'sourceCurrency',
                message: 'Source currency is required',
            });
        }

        if (!request.destinationCurrency) {
            errors.push({
                field: 'destinationCurrency',
                message: 'Destination currency is required',
            });
        }

        if (!request.destinationCountry) {
            errors.push({
                field: 'destinationCountry',
                message: 'Destination country is required',
            });
        }

        if (errors.length > 0) {
            throw new ValidationError('Validation failed', errors);
        }
    }
}
