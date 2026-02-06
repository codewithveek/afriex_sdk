import axios, { AxiosError, } from 'axios';
import { Logger } from '../utils/logger';
import { AfriexError, ApiError, NetworkError, RateLimitError, } from '../errors';
export class HttpClient {
    constructor(config) {
        this.config = config;
        this.logger = new Logger(config.logLevel, config.enableLogging);
        this.axiosInstance = axios.create({
            baseURL: config.baseUrl,
            timeout: config.timeout,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`,
                'User-Agent': 'Afriex-TypeScript-SDK/1.0.0',
            },
        });
        this.setupInterceptors();
    }
    setupInterceptors() {
        // Request interceptor
        this.axiosInstance.interceptors.request.use((config) => {
            this.logger.debug('Request:', {
                method: config.method?.toUpperCase(),
                url: config.url,
                params: config.params,
            });
            return config;
        }, (error) => {
            this.logger.error('Request Error:', error);
            return Promise.reject(error);
        });
        // Response interceptor
        this.axiosInstance.interceptors.response.use((response) => {
            this.logger.debug('Response:', {
                status: response.status,
                url: response.config.url,
            });
            return response;
        }, async (error) => {
            return this.handleError(error);
        });
    }
    async handleError(error) {
        if (error.response) {
            // Server responded with error
            const { status, data } = error.response;
            this.logger.error('API Error:', {
                status,
                data,
                url: error.config?.url,
            });
            // Check if we should retry
            if (this.shouldRetry(error)) {
                return this.retryRequest(error);
            }
            // Handle rate limiting
            if (status === 429) {
                throw new RateLimitError(data, error.response.headers['retry-after']);
            }
            // Handle other API errors
            throw new ApiError(data, status);
        }
        else if (error.request) {
            // Request made but no response
            this.logger.error('Network Error:', error.message);
            throw new NetworkError('No response received from server', error);
        }
        else {
            // Something else happened
            this.logger.error('Unknown Error:', error.message);
            throw new AfriexError(error.message);
        }
    }
    shouldRetry(error) {
        if (!error.config || !error.response) {
            return false;
        }
        const status = error.response.status;
        const config = error.config;
        const retryCount = config.__retryCount || 0;
        return (retryCount < this.config.maxRetries &&
            this.config.retryableStatusCodes.includes(status));
    }
    async retryRequest(error) {
        const config = error.config;
        config.__retryCount = (config.__retryCount || 0) + 1;
        const delay = this.config.retryDelay * Math.pow(2, config.__retryCount - 1);
        this.logger.info(`Retrying request (${config.__retryCount}/${this.config.maxRetries}) after ${delay}ms`);
        await this.sleep(delay);
        try {
            const response = await this.axiosInstance.request(config);
            return response.data;
        }
        catch (retryError) {
            if (retryError instanceof AxiosError) {
                return this.handleError(retryError);
            }
            throw retryError;
        }
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async get(path, options) {
        const response = await this.axiosInstance.get(path, {
            params: options?.params,
            headers: options?.headers,
            timeout: options?.timeout,
        });
        return response.data;
    }
    async post(path, data, options) {
        const response = await this.axiosInstance.post(path, data, {
            params: options?.params,
            headers: options?.headers,
            timeout: options?.timeout,
        });
        return response.data;
    }
    async put(path, data, options) {
        const response = await this.axiosInstance.put(path, data, {
            params: options?.params,
            headers: options?.headers,
            timeout: options?.timeout,
        });
        return response.data;
    }
    async patch(path, data, options) {
        const response = await this.axiosInstance.patch(path, data, {
            params: options?.params,
            headers: options?.headers,
            timeout: options?.timeout,
        });
        return response.data;
    }
    async delete(path, options) {
        const response = await this.axiosInstance.delete(path, {
            params: options?.params,
            headers: options?.headers,
            timeout: options?.timeout,
        });
        return response.data;
    }
}
//# sourceMappingURL=HttpClient.js.map