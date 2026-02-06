import { AfriexError } from './AfriexError';
export class ApiError extends AfriexError {
    constructor(response, statusCode) {
        const errorMessage = response.error?.message ||
            response.message ||
            'An API error occurred';
        super(errorMessage);
        this.statusCode = statusCode;
        this.errorCode = response.error?.code || response.code;
        this.details = response.error?.details || response.details;
        this.response = response;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            statusCode: this.statusCode,
            errorCode: this.errorCode,
            details: this.details,
            response: this.response,
        };
    }
}
//# sourceMappingURL=ApiError.js.map