import { Config } from '../config/Config';
import { HttpClient } from './HttpClient';
export class AfriexClient {
    constructor(config) {
        this.config = new Config(config);
        this.httpClient = new HttpClient(this.config);
    }
    /**
     * Get the HTTP client for custom requests
     */
    getHttpClient() {
        return this.httpClient;
    }
    /**
     * Get the current configuration
     */
    getConfig() {
        return this.config;
    }
}
//# sourceMappingURL=AfriexClient.js.map