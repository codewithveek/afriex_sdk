import { HttpClient, ValidationError, Country } from '@afriex/core';
import {
    Bank,
    VerifyBankAccountRequest,
    VerifyBankAccountResponse,
} from './types';

export class BankService {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    /**
     * Get list of supported banks for a country
     */
    async listBanks(country: Country): Promise<Bank[]> {
        if (!country) {
            throw new ValidationError('Country is required');
        }

        const response = await this.httpClient.get<{ data: Bank[] }>(
            `/v1/banks/${country}`
        );

        return response.data;
    }

    /**
     * Verify a bank account
     */
    async verifyAccount(
        request: VerifyBankAccountRequest
    ): Promise<VerifyBankAccountResponse> {
        if (!request.bankCode || !request.accountNumber || !request.country) {
            throw new ValidationError(
                'Bank code, account number, and country are required'
            );
        }

        return this.httpClient.post<VerifyBankAccountResponse>(
            '/v1/banks/verify',
            request
        );
    }
}
