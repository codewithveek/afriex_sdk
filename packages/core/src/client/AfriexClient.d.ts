import { Config, AfriexConfig } from '../config/Config';
import { HttpClient } from './HttpClient';
export declare class AfriexClient {
    private config;
    private httpClient;
    constructor(config: AfriexConfig);
    /**
     * Get the HTTP client for custom requests
     */
    getHttpClient(): HttpClient;
    /**
     * Get the current configuration
     */
    getConfig(): Config;
}
//# sourceMappingURL=AfriexClient.d.ts.map