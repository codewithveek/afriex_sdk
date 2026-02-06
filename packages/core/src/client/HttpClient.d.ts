import { Config } from '../config/Config';
export interface RequestOptions {
    headers?: Record<string, string>;
    params?: Record<string, unknown>;
    timeout?: number;
}
export declare class HttpClient {
    private axiosInstance;
    private logger;
    private config;
    constructor(config: Config);
    private setupInterceptors;
    private handleError;
    private shouldRetry;
    private retryRequest;
    private sleep;
    get<T>(path: string, options?: RequestOptions): Promise<T>;
    post<T>(path: string, data?: unknown, options?: RequestOptions): Promise<T>;
    put<T>(path: string, data?: unknown, options?: RequestOptions): Promise<T>;
    patch<T>(path: string, data?: unknown, options?: RequestOptions): Promise<T>;
    delete<T>(path: string, options?: RequestOptions): Promise<T>;
}
//# sourceMappingURL=HttpClient.d.ts.map