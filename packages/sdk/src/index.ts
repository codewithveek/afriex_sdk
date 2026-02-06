import { AfriexClient, AfriexConfig } from '@afriex/core';
import { CustomerService } from '@afriex/customers';
import { TransactionService } from '@afriex/transactions';
import { PaymentMethodService } from '@afriex/payment-methods';
import { BalanceService } from '@afriex/balance';
import { RateService } from '@afriex/rates';
import { WebhookVerifier } from '@afriex/webhooks';

export interface AfriexSDKConfig extends AfriexConfig {
    webhookPublicKey?: string;
}

export class Afriex extends AfriexClient {
    public readonly customers: CustomerService;
    public readonly transactions: TransactionService;
    public readonly paymentMethods: PaymentMethodService;
    public readonly balance: BalanceService;
    public readonly rates: RateService;
    public readonly webhooks?: WebhookVerifier;

    constructor(config: AfriexSDKConfig) {
        super(config);

        const httpClient = this.getHttpClient();

        this.customers = new CustomerService(httpClient);
        this.transactions = new TransactionService(httpClient);
        this.paymentMethods = new PaymentMethodService(httpClient);
        this.balance = new BalanceService(httpClient);
        this.rates = new RateService(httpClient);

        if (config.webhookPublicKey) {
            this.webhooks = new WebhookVerifier(config.webhookPublicKey);
        }
    }
}

// Alias for backward compatibility
export { Afriex as AfriexSDK };

// Re-export all types and modules
export * from '@afriex/core';
export * from '@afriex/customers';
export * from '@afriex/transactions';
export * from '@afriex/payment-methods';
export * from '@afriex/balance';
export * from '@afriex/rates';
export * from '@afriex/webhooks';
