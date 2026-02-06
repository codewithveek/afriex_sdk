import { Environment, EnvironmentConfig } from './Environment';
import { LogLevel } from '../utils/logger';
export interface AfriexConfig {
    apiKey: string;
    environment?: Environment;
    customConfig?: Partial<EnvironmentConfig>;
    logLevel?: LogLevel;
    enableLogging?: boolean;
    retryConfig?: RetryConfig;
    webhookSecret?: string;
}
export interface RetryConfig {
    maxRetries: number;
    retryDelay: number;
    retryableStatusCodes: number[];
}
export declare class Config {
    readonly apiKey: string;
    readonly environment: Environment;
    readonly baseUrl: string;
    readonly timeout: number;
    readonly maxRetries: number;
    readonly retryDelay: number;
    readonly logLevel: LogLevel;
    readonly enableLogging: boolean;
    readonly retryableStatusCodes: number[];
    readonly webhookSecret?: string;
    constructor(config: AfriexConfig);
    private validateConfig;
}
//# sourceMappingURL=Config.d.ts.map