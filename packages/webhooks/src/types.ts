export enum WebhookEventType {
    TRANSFER_CREATED = 'transfer.created',
    TRANSFER_COMPLETED = 'transfer.completed',
    TRANSFER_FAILED = 'transfer.failed',
    WALLET_FUNDED = 'wallet.funded',
    WALLET_WITHDRAWN = 'wallet.withdrawn',
}

export interface WebhookEvent {
    id: string;
    type: WebhookEventType;
    createdAt: string;
    data: unknown;
}

export interface WebhookPayload {
    event: WebhookEvent;
    signature: string;
    timestamp: string;
}

export interface WebhookEndpoint {
    id: string;
    url: string;
    events: WebhookEventType[];
    status: 'active' | 'disabled';
    createdAt: string;
}

export interface CreateWebhookRequest {
    url: string;
    events: WebhookEventType[];
}
