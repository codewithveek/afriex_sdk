import { Environment, DEFAULT_CONFIG } from './Environment';
import { LogLevel } from '../utils/logger';
export class Config {
    constructor(config) {
        this.validateConfig(config);
        this.apiKey = config.apiKey;
        this.environment = config.environment || Environment.PRODUCTION;
        this.logLevel = config.logLevel || LogLevel.ERROR;
        this.enableLogging = config.enableLogging ?? true;
        this.webhookSecret = config.webhookSecret;
        const envConfig = DEFAULT_CONFIG[this.environment];
        const customConfig = config.customConfig || {};
        this.baseUrl = customConfig.baseUrl || envConfig.baseUrl;
        this.timeout = customConfig.timeout || envConfig.timeout;
        this.maxRetries = config.retryConfig?.maxRetries || envConfig.maxRetries;
        this.retryDelay = config.retryConfig?.retryDelay || envConfig.retryDelay;
        this.retryableStatusCodes = config.retryConfig?.retryableStatusCodes || [
            408, 429, 500, 502, 503, 504,
        ];
    }
    validateConfig(config) {
        if (!config.apiKey || typeof config.apiKey !== 'string') {
            throw new Error('API key is required and must be a string');
        }
        if (config.apiKey.trim().length === 0) {
            throw new Error('API key cannot be empty');
        }
    }
}
//# sourceMappingURL=Config.js.map