export var Environment;
(function (Environment) {
    Environment["STAGING"] = "staging";
    Environment["PRODUCTION"] = "production";
})(Environment || (Environment = {}));
export const BASE_URLS = {
    [Environment.STAGING]: 'https://staging.afx-server.com',
    [Environment.PRODUCTION]: 'https://prod.afx-server.com',
};
export const DEFAULT_CONFIG = {
    [Environment.STAGING]: {
        baseUrl: BASE_URLS[Environment.STAGING],
        timeout: 30000,
        maxRetries: 3,
        retryDelay: 1000,
    },
    [Environment.PRODUCTION]: {
        baseUrl: BASE_URLS[Environment.PRODUCTION],
        timeout: 30000,
        maxRetries: 3,
        retryDelay: 1000,
    },
};
//# sourceMappingURL=Environment.js.map