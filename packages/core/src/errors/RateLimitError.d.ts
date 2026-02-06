import { ApiError, ApiErrorResponse } from './ApiError';
export declare class RateLimitError extends ApiError {
    readonly retryAfter?: number;
    constructor(response: ApiErrorResponse, retryAfter?: string);
    toJSON(): {
        retryAfter: number | undefined;
        statusCode: number;
        errorCode: string | undefined;
        details: unknown;
        response: ApiErrorResponse;
        name: string;
        message: string;
        timestamp: Date;
        stack: string | undefined;
    };
}
//# sourceMappingURL=RateLimitError.d.ts.map