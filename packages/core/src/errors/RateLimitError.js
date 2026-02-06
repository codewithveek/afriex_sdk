import { ApiError } from './ApiError';
export class RateLimitError extends ApiError {
    constructor(response, retryAfter) {
        super(response, 429);
        this.retryAfter = retryAfter ? parseInt(retryAfter, 10) : undefined;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            retryAfter: this.retryAfter,
        };
    }
}
//# sourceMappingURL=RateLimitError.js.map