import crypto from 'crypto';
import { WebhookPayload } from './types';

export class WebhookVerifier {
    private webhookSecret: string;

    constructor(webhookSecret: string) {
        if (!webhookSecret) {
            throw new Error('Webhook secret is required');
        }
        this.webhookSecret = webhookSecret;
    }

    /**
     * Verify webhook signature
     */
    verify(payload: string, signature: string, timestamp: string): boolean {
        const expectedSignature = this.generateSignature(payload, timestamp);
        return crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(expectedSignature)
        );
    }

    /**
     * Verify and parse webhook payload
     */
    verifyAndParse(
        rawPayload: string,
        signature: string,
        timestamp: string,
        toleranceInSeconds: number = 300
    ): WebhookPayload {
        // Check timestamp to prevent replay attacks
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const payloadTimestamp = parseInt(timestamp, 10);

        if (currentTimestamp - payloadTimestamp > toleranceInSeconds) {
            throw new Error('Webhook timestamp is too old');
        }

        // Verify signature
        if (!this.verify(rawPayload, signature, timestamp)) {
            throw new Error('Invalid webhook signature');
        }

        // Parse payload
        return JSON.parse(rawPayload);
    }

    private generateSignature(payload: string, timestamp: string): string {
        const signedPayload = `${timestamp}.${payload}`;
        return crypto
            .createHmac('sha256', this.webhookSecret)
            .update(signedPayload)
            .digest('hex');
    }
}
