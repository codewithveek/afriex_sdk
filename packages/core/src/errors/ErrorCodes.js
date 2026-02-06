export var AfriexErrorCode;
(function (AfriexErrorCode) {
    // Authentication errors
    AfriexErrorCode["INVALID_API_KEY"] = "INVALID_API_KEY";
    AfriexErrorCode["UNAUTHORIZED"] = "UNAUTHORIZED";
    AfriexErrorCode["FORBIDDEN"] = "FORBIDDEN";
    // Validation errors
    AfriexErrorCode["INVALID_REQUEST"] = "INVALID_REQUEST";
    AfriexErrorCode["MISSING_REQUIRED_FIELD"] = "MISSING_REQUIRED_FIELD";
    AfriexErrorCode["INVALID_FIELD_FORMAT"] = "INVALID_FIELD_FORMAT";
    // Business logic errors
    AfriexErrorCode["INSUFFICIENT_BALANCE"] = "INSUFFICIENT_BALANCE";
    AfriexErrorCode["TRANSFER_LIMIT_EXCEEDED"] = "TRANSFER_LIMIT_EXCEEDED";
    AfriexErrorCode["INVALID_RECIPIENT"] = "INVALID_RECIPIENT";
    AfriexErrorCode["UNSUPPORTED_CURRENCY"] = "UNSUPPORTED_CURRENCY";
    AfriexErrorCode["UNSUPPORTED_COUNTRY"] = "UNSUPPORTED_COUNTRY";
    // Transaction errors
    AfriexErrorCode["TRANSACTION_FAILED"] = "TRANSACTION_FAILED";
    AfriexErrorCode["TRANSACTION_PENDING"] = "TRANSACTION_PENDING";
    AfriexErrorCode["TRANSACTION_DECLINED"] = "TRANSACTION_DECLINED";
    // Network errors
    AfriexErrorCode["NETWORK_ERROR"] = "NETWORK_ERROR";
    AfriexErrorCode["TIMEOUT"] = "TIMEOUT";
    // Server errors
    AfriexErrorCode["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    AfriexErrorCode["SERVICE_UNAVAILABLE"] = "SERVICE_UNAVAILABLE";
    // Rate limiting
    AfriexErrorCode["RATE_LIMIT_EXCEEDED"] = "RATE_LIMIT_EXCEEDED";
    // Unknown
    AfriexErrorCode["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
})(AfriexErrorCode || (AfriexErrorCode = {}));
export const ERROR_CODE_MESSAGES = {
    [AfriexErrorCode.INVALID_API_KEY]: 'Invalid API key provided',
    [AfriexErrorCode.UNAUTHORIZED]: 'Authentication required',
    [AfriexErrorCode.FORBIDDEN]: 'Access forbidden',
    [AfriexErrorCode.INVALID_REQUEST]: 'Invalid request',
    [AfriexErrorCode.MISSING_REQUIRED_FIELD]: 'Missing required field',
    [AfriexErrorCode.INVALID_FIELD_FORMAT]: 'Invalid field format',
    [AfriexErrorCode.INSUFFICIENT_BALANCE]: 'Insufficient balance',
    [AfriexErrorCode.TRANSFER_LIMIT_EXCEEDED]: 'Transfer limit exceeded',
    [AfriexErrorCode.INVALID_RECIPIENT]: 'Invalid recipient',
    [AfriexErrorCode.UNSUPPORTED_CURRENCY]: 'Unsupported currency',
    [AfriexErrorCode.UNSUPPORTED_COUNTRY]: 'Unsupported country',
    [AfriexErrorCode.TRANSACTION_FAILED]: 'Transaction failed',
    [AfriexErrorCode.TRANSACTION_PENDING]: 'Transaction pending',
    [AfriexErrorCode.TRANSACTION_DECLINED]: 'Transaction declined',
    [AfriexErrorCode.NETWORK_ERROR]: 'Network error',
    [AfriexErrorCode.TIMEOUT]: 'Request timeout',
    [AfriexErrorCode.INTERNAL_SERVER_ERROR]: 'Internal server error',
    [AfriexErrorCode.SERVICE_UNAVAILABLE]: 'Service unavailable',
    [AfriexErrorCode.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded',
    [AfriexErrorCode.UNKNOWN_ERROR]: 'Unknown error',
};
//# sourceMappingURL=ErrorCodes.js.map