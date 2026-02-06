import { HttpClient, ValidationError, PaginatedResponse, Money } from '@afriex/core';
import {
    Wallet,
    CreateWalletRequest,
    WalletTransaction,
    ListWalletTransactionsParams,
    FundWalletRequest,
    WithdrawFromWalletRequest,
} from './types';

export class WalletService {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    /**
     * Create a new wallet
     */
    async create(request: CreateWalletRequest): Promise<Wallet> {
        if (!request.type || !request.currency) {
            throw new ValidationError('Wallet type and currency are required');
        }

        return this.httpClient.post<Wallet>('/v1/wallets', request);
    }

    /**
     * Get a wallet by ID
     */
    async get(walletId: string): Promise<Wallet> {
        if (!walletId) {
            throw new ValidationError('Wallet ID is required');
        }

        return this.httpClient.get<Wallet>(`/v1/wallets/${walletId}`);
    }

    /**
     * List all wallets
     */
    async list(): Promise<Wallet[]> {
        const response = await this.httpClient.get<{ data: Wallet[] }>(
            '/v1/wallets'
        );
        return response.data;
    }

    /**
     * Get wallet balance
     */
    async getBalance(walletId: string): Promise<Money> {
        if (!walletId) {
            throw new ValidationError('Wallet ID is required');
        }

        const wallet = await this.get(walletId);
        return wallet.balance;
    }

    /**
     * List wallet transactions
     */
    async listTransactions(
        walletId: string,
        params?: ListWalletTransactionsParams
    ): Promise<PaginatedResponse<WalletTransaction>> {
        if (!walletId) {
            throw new ValidationError('Wallet ID is required');
        }

        return this.httpClient.get<PaginatedResponse<WalletTransaction>>(
            `/v1/wallets/${walletId}/transactions`,
            { params }
        );
    }

    /**
     * Fund a wallet
     */
    async fund(request: FundWalletRequest): Promise<WalletTransaction> {
        if (!request.walletId) {
            throw new ValidationError('Wallet ID is required');
        }

        if (!request.amount || request.amount <= 0) {
            throw new ValidationError('Amount must be greater than 0');
        }

        return this.httpClient.post<WalletTransaction>(
            `/v1/wallets/${request.walletId}/fund`,
            request
        );
    }

    /**
     * Withdraw from a wallet
     */
    async withdraw(request: WithdrawFromWalletRequest): Promise<WalletTransaction> {
        if (!request.walletId) {
            throw new ValidationError('Wallet ID is required');
        }

        if (!request.amount || request.amount <= 0) {
            throw new ValidationError('Amount must be greater than 0');
        }

        return this.httpClient.post<WalletTransaction>(
            `/v1/wallets/${request.walletId}/withdraw`,
            request
        );
    }
}
