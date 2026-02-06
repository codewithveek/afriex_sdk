import { HttpClient, ValidationError, PaginatedResponse } from '@afriex/core';
import {
    Recipient,
    CreateRecipientRequest,
    UpdateRecipientRequest,
    ListRecipientsParams,
} from './types';

export class RecipientService {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    /**
     * Create a new recipient
     */
    async create(request: CreateRecipientRequest): Promise<Recipient> {
        this.validateCreateRequest(request);

        return this.httpClient.post<Recipient>('/v1/recipients', request);
    }

    /**
     * Get a recipient by ID
     */
    async get(recipientId: string): Promise<Recipient> {
        if (!recipientId) {
            throw new ValidationError('Recipient ID is required');
        }

        return this.httpClient.get<Recipient>(`/v1/recipients/${recipientId}`);
    }

    /**
     * List all recipients
     */
    async list(
        params?: ListRecipientsParams
    ): Promise<PaginatedResponse<Recipient>> {
        return this.httpClient.get<PaginatedResponse<Recipient>>(
            '/v1/recipients',
            { params }
        );
    }

    /**
     * Update a recipient
     */
    async update(
        recipientId: string,
        request: UpdateRecipientRequest
    ): Promise<Recipient> {
        if (!recipientId) {
            throw new ValidationError('Recipient ID is required');
        }

        return this.httpClient.patch<Recipient>(
            `/v1/recipients/${recipientId}`,
            request
        );
    }

    /**
     * Delete a recipient
     */
    async delete(recipientId: string): Promise<void> {
        if (!recipientId) {
            throw new ValidationError('Recipient ID is required');
        }

        await this.httpClient.delete(`/v1/recipients/${recipientId}`);
    }

    private validateCreateRequest(request: CreateRecipientRequest): void {
        const errors: Array<{ field: string; message: string }> = [];

        if (!request.firstName) {
            errors.push({ field: 'firstName', message: 'First name is required' });
        }

        if (!request.lastName) {
            errors.push({ field: 'lastName', message: 'Last name is required' });
        }

        if (!request.country) {
            errors.push({ field: 'country', message: 'Country is required' });
        }

        if (!request.currency) {
            errors.push({ field: 'currency', message: 'Currency is required' });
        }

        if (!request.bankDetails && !request.mobileMoneyDetails) {
            errors.push({
                field: 'paymentDetails',
                message: 'Either bank details or mobile money details are required',
            });
        }

        if (errors.length > 0) {
            throw new ValidationError('Validation failed', errors);
        }
    }
}
