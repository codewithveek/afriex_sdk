import { AfriexError } from './AfriexError';
export declare class NetworkError extends AfriexError {
    readonly originalError?: Error;
    constructor(message: string, originalError?: Error);
    toJSON(): {
        originalError: string | undefined;
        name: string;
        message: string;
        timestamp: Date;
        stack: string | undefined;
    };
}
//# sourceMappingURL=NetworkError.d.ts.map