export declare enum Environment {
    STAGING = "staging",
    PRODUCTION = "production"
}
export declare const BASE_URLS: {
    readonly staging: "https://staging.afx-server.com";
    readonly production: "https://prod.afx-server.com";
};
export interface EnvironmentConfig {
    baseUrl: string;
    timeout: number;
    maxRetries: number;
    retryDelay: number;
}
export declare const DEFAULT_CONFIG: Record<Environment, EnvironmentConfig>;
//# sourceMappingURL=Environment.d.ts.map