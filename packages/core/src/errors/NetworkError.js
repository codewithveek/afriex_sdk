import { AfriexError } from './AfriexError';
export class NetworkError extends AfriexError {
    constructor(message, originalError) {
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
//# sourceMappingURL=NetworkError.js.map