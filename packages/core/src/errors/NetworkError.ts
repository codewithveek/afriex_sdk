import { AfriexError } from './AfriexError';

export class NetworkError extends AfriexError {
    public readonly originalError?: Error;

    constructor(message: string, originalError?: Error) {
        super(message);
        this.originalError = originalError;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            originalError: this.originalError?.message,
        };
    }
}
