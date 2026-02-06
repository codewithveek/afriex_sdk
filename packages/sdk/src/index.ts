import { AfriexClient, AfriexConfig } from '@afriex/core';
import { TransferService } from '@afriex/transfers';
import { WalletService } from '@afriex/wallets';
import { RecipientService } from '@afriex/recipients';
import { RateService } from '@afriex/rates';
import { WebhookService } from '@afriex/webhooks';
import { BankService } from '@afriex/banks';

export class AfriexSDK extends AfriexClient {
    public readonly transfers: TransferService;
    public readonly wallets: WalletService;
    public readonly recipients: RecipientService;
    public readonly rates: RateService;
    public readonly webhooks: WebhookService;
    public readonly banks: BankService;

    constructor(config: AfriexConfig) {
        super(config);

        const httpClient = this.getHttpClient();

        this.transfers = new TransferService(httpClient);
        this.wallets = new WalletService(httpClient);
        this.recipients = new RecipientService(httpClient);
        this.rates = new RateService(httpClient);
        this.webhooks = new WebhookService(httpClient, config.webhookSecret);
        this.banks = new BankService(httpClient);
    }
}

// Re-export all types and modules
export * from '@afriex/core';
export * from '@afriex/transfers';
export * from '@afriex/wallets';
export * from '@afriex/recipients';
export * from '@afriex/rates';
export * from '@afriex/webhooks';
export * from '@afriex/banks';
