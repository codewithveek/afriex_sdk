import { AfriexError } from './AfriexError';
export interface ApiErrorResponse {
    error?: {
        code: string;
        message: string;
        details?: unknown;
    };
    message?: string;
    code?: string;
    details?: unknown;
}
export declare class ApiError extends AfriexError {
    readonly statusCode: number;
    readonly errorCode?: string;
    readonly details?: unknown;
    readonly response: ApiErrorResponse;
    constructor(response: ApiErrorResponse, statusCode: number);
    toJSON(): {
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
//# sourceMappingURL=ApiError.d.ts.map