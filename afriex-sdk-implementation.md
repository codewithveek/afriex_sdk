# Afriex Business API - TypeScript SDK Implementation Guide

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Monorepo Structure](#monorepo-structure)
4. [Core Implementation](#core-implementation)
5. [API Modules](#api-modules)
6. [Error Handling](#error-handling)
7. [Type Definitions](#type-definitions)
8. [Testing Strategy](#testing-strategy)
9. [Build & Deployment](#build--deployment)
10. [Usage Examples](#usage-examples)

---

## Project Overview

### Purpose
Build a production-ready TypeScript SDK for the Afriex Business API that simplifies integration for developers by providing type-safe, well-documented methods for international money transfers, wallet management, and business payments.

### Key Features
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Error Handling**: Robust error handling with detailed error codes and messages
- **Environment Support**: Staging and production environment configuration
- **Authentication**: Secure API key management
- **Pagination**: Built-in pagination support for list endpoints
- **Webhooks**: Webhook signature verification
- **Retry Logic**: Automatic retry for transient failures
- **Rate Limiting**: Built-in rate limit handling
- **Logging**: Configurable logging for debugging
- **Tree-shakable**: Modular design for optimal bundle size

### Base URLs
- **Staging**: `https://staging.afx-server.com`
- **Production**: `https://prod.afx-server.com`

---

## Architecture

### Technology Stack
- **Language**: TypeScript 5.x
- **HTTP Client**: Axios
- **Build Tool**: Rollup / tsup
- **Testing**: Jest + MSW (Mock Service Worker)
- **Package Manager**: pnpm (for monorepo)
- **Monorepo**: Turborepo or Nx
- **Documentation**: TypeDoc
- **Linting**: ESLint + Prettier

### Design Principles
1. **Single Responsibility**: Each module handles one domain (transfers, wallets, etc.)
2. **Dependency Injection**: Easy mocking and testing
3. **Immutability**: Avoid side effects
4. **Error First**: Comprehensive error handling
5. **Defensive Programming**: Validate inputs, handle edge cases

---

## Monorepo Structure

```
afriex-sdk/
├── packages/
│   ├── core/                 # Core SDK functionality
│   │   ├── src/
│   │   │   ├── client/
│   │   │   │   ├── AfriexClient.ts
│   │   │   │   ├── HttpClient.ts
│   │   │   │   └── RequestBuilder.ts
│   │   │   ├── config/
│   │   │   │   ├── Environment.ts
│   │   │   │   └── Config.ts
│   │   │   ├── errors/
│   │   │   │   ├── AfriexError.ts
│   │   │   │   ├── ApiError.ts
│   │   │   │   ├── ValidationError.ts
│   │   │   │   ├── NetworkError.ts
│   │   │   │   └── ErrorCodes.ts
│   │   │   ├── types/
│   │   │   │   ├── common.ts
│   │   │   │   ├── api.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── validators.ts
│   │   │   │   ├── formatters.ts
│   │   │   │   └── logger.ts
│   │   │   └── index.ts
│   │   ├── tests/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── transfers/             # Money transfer operations
│   │   ├── src/
│   │   │   ├── TransferService.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── tests/
│   │   └── package.json
│   │
│   ├── wallets/              # Wallet management
│   │   ├── src/
│   │   │   ├── WalletService.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── tests/
│   │   └── package.json
│   │
│   ├── recipients/           # Recipient management
│   │   ├── src/
│   │   │   ├── RecipientService.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── tests/
│   │   └── package.json
│   │
│   ├── rates/                # Exchange rate operations
│   │   ├── src/
│   │   │   ├── RateService.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── tests/
│   │   └── package.json
│   │
│   ├── webhooks/             # Webhook handling
│   │   ├── src/
│   │   │   ├── WebhookService.ts
│   │   │   ├── WebhookVerifier.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── tests/
│   │   └── package.json
│   │
│   ├── banks/                # Bank code utilities
│   │   ├── src/
│   │   │   ├── BankService.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── tests/
│   │   └── package.json
│   │
│   └── sdk/                  # Main SDK package (re-exports all)
│       ├── src/
│       │   └── index.ts
│       ├── tests/
│       └── package.json
│
├── examples/
│   ├── node-express/
│   ├── nextjs/
│   └── typescript/
│
├── docs/
│   ├── api/
│   ├── guides/
│   └── migration/
│
├── tools/
│   └── scripts/
│
├── .github/
│   └── workflows/
│
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

---

## Core Implementation

### 1. Configuration & Environment

```typescript
// packages/core/src/config/Environment.ts

export enum Environment {
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export const BASE_URLS = {
  [Environment.STAGING]: 'https://staging.afx-server.com',
  [Environment.PRODUCTION]: 'https://prod.afx-server.com',
} as const;

export interface EnvironmentConfig {
  baseUrl: string;
  timeout: number;
  maxRetries: number;
  retryDelay: number;
}

export const DEFAULT_CONFIG: Record<Environment, EnvironmentConfig> = {
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
```

```typescript
// packages/core/src/config/Config.ts

import { Environment, DEFAULT_CONFIG, EnvironmentConfig } from './Environment';
import { LogLevel } from '../utils/logger';

export interface AfriexConfig {
  apiKey: string;
  environment?: Environment;
  customConfig?: Partial<EnvironmentConfig>;
  logLevel?: LogLevel;
  enableLogging?: boolean;
  retryConfig?: RetryConfig;
}

export interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  retryableStatusCodes: number[];
}

export class Config {
  public readonly apiKey: string;
  public readonly environment: Environment;
  public readonly baseUrl: string;
  public readonly timeout: number;
  public readonly maxRetries: number;
  public readonly retryDelay: number;
  public readonly logLevel: LogLevel;
  public readonly enableLogging: boolean;
  public readonly retryableStatusCodes: number[];

  constructor(config: AfriexConfig) {
    this.validateConfig(config);

    this.apiKey = config.apiKey;
    this.environment = config.environment || Environment.PRODUCTION;
    this.logLevel = config.logLevel || LogLevel.ERROR;
    this.enableLogging = config.enableLogging ?? true;

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

  private validateConfig(config: AfriexConfig): void {
    if (!config.apiKey || typeof config.apiKey !== 'string') {
      throw new Error('API key is required and must be a string');
    }

    if (config.apiKey.trim().length === 0) {
      throw new Error('API key cannot be empty');
    }
  }
}
```

### 2. HTTP Client

```typescript
// packages/core/src/client/HttpClient.ts

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { Config } from '../config/Config';
import { Logger } from '../utils/logger';
import {
  AfriexError,
  ApiError,
  NetworkError,
  RateLimitError,
} from '../errors';

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
}

export class HttpClient {
  private axiosInstance: AxiosInstance;
  private logger: Logger;
  private config: Config;

  constructor(config: Config) {
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

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        this.logger.debug('Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          params: config.params,
        });
        return config;
      },
      (error) => {
        this.logger.error('Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        this.logger.debug('Response:', {
          status: response.status,
          url: response.config.url,
        });
        return response;
      },
      async (error: AxiosError) => {
        return this.handleError(error);
      }
    );
  }

  private async handleError(error: AxiosError): Promise<never> {
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
        throw new RateLimitError(
          data as any,
          error.response.headers['retry-after']
        );
      }

      // Handle other API errors
      throw new ApiError(data as any, status);
    } else if (error.request) {
      // Request made but no response
      this.logger.error('Network Error:', error.message);
      throw new NetworkError('No response received from server', error);
    } else {
      // Something else happened
      this.logger.error('Unknown Error:', error.message);
      throw new AfriexError(error.message);
    }
  }

  private shouldRetry(error: AxiosError): boolean {
    if (!error.config || !error.response) {
      return false;
    }

    const status = error.response.status;
    const retryCount = (error.config as any).__retryCount || 0;

    return (
      retryCount < this.config.maxRetries &&
      this.config.retryableStatusCodes.includes(status)
    );
  }

  private async retryRequest(error: AxiosError): Promise<never> {
    const config = error.config as any;
    config.__retryCount = (config.__retryCount || 0) + 1;

    const delay = this.config.retryDelay * Math.pow(2, config.__retryCount - 1);

    this.logger.info(`Retrying request (${config.__retryCount}/${this.config.maxRetries}) after ${delay}ms`);

    await this.sleep(delay);

    try {
      const response = await this.axiosInstance.request(config);
      return response.data;
    } catch (retryError) {
      if (retryError instanceof AxiosError) {
        return this.handleError(retryError);
      }
      throw retryError;
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async get<T>(
    path: string,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.axiosInstance.get<T>(path, {
      params: options?.params,
      headers: options?.headers,
      timeout: options?.timeout,
    });
    return response.data;
  }

  async post<T>(
    path: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(path, data, {
      params: options?.params,
      headers: options?.headers,
      timeout: options?.timeout,
    });
    return response.data;
  }

  async put<T>(
    path: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(path, data, {
      params: options?.params,
      headers: options?.headers,
      timeout: options?.timeout,
    });
    return response.data;
  }

  async patch<T>(
    path: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.axiosInstance.patch<T>(path, data, {
      params: options?.params,
      headers: options?.headers,
      timeout: options?.timeout,
    });
    return response.data;
  }

  async delete<T>(
    path: string,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.axiosInstance.delete<T>(path, {
      params: options?.params,
      headers: options?.headers,
      timeout: options?.timeout,
    });
    return response.data;
  }
}
```

### 3. Main SDK Client

```typescript
// packages/core/src/client/AfriexClient.ts

import { Config, AfriexConfig } from '../config/Config';
import { HttpClient } from './HttpClient';

export class AfriexClient {
  private config: Config;
  private httpClient: HttpClient;

  constructor(config: AfriexConfig) {
    this.config = new Config(config);
    this.httpClient = new HttpClient(this.config);
  }

  /**
   * Get the HTTP client for custom requests
   */
  getHttpClient(): HttpClient {
    return this.httpClient;
  }

  /**
   * Get the current configuration
   */
  getConfig(): Config {
    return this.config;
  }
}
```

---

## Error Handling

### Error Classes

```typescript
// packages/core/src/errors/AfriexError.ts

export class AfriexError extends Error {
  public readonly name: string;
  public readonly timestamp: Date;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date();
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}
```

```typescript
// packages/core/src/errors/ApiError.ts

import { AfriexError } from './AfriexError';

export interface ApiErrorResponse {
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  message?: string;
  code?: string;
  details?: any;
}

export class ApiError extends AfriexError {
  public readonly statusCode: number;
  public readonly errorCode?: string;
  public readonly details?: any;
  public readonly response: ApiErrorResponse;

  constructor(response: ApiErrorResponse, statusCode: number) {
    const errorMessage =
      response.error?.message ||
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
```

```typescript
// packages/core/src/errors/ValidationError.ts

import { AfriexError } from './AfriexError';

export interface ValidationErrorField {
  field: string;
  message: string;
  code?: string;
}

export class ValidationError extends AfriexError {
  public readonly fields: ValidationErrorField[];

  constructor(message: string, fields: ValidationErrorField[] = []) {
    super(message);
    this.fields = fields;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      fields: this.fields,
    };
  }
}
```

```typescript
// packages/core/src/errors/NetworkError.ts

import { AfriexError } from './AfriexError';

export class NetworkError extends AfriexError {
  public readonly originalError?: Error;

  constructor(message: string, originalError?: Error) {
    super(message);
    this.originalError = originalError;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      originalError: this.originalError?.message,
    };
  }
}
```

```typescript
// packages/core/src/errors/RateLimitError.ts

import { ApiError, ApiErrorResponse } from './ApiError';

export class RateLimitError extends ApiError {
  public readonly retryAfter?: number;

  constructor(response: ApiErrorResponse, retryAfter?: string) {
    super(response, 429);
    this.retryAfter = retryAfter ? parseInt(retryAfter, 10) : undefined;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      retryAfter: this.retryAfter,
    };
  }
}
```

```typescript
// packages/core/src/errors/ErrorCodes.ts

export enum AfriexErrorCode {
  // Authentication errors
  INVALID_API_KEY = 'INVALID_API_KEY',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',

  // Validation errors
  INVALID_REQUEST = 'INVALID_REQUEST',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_FIELD_FORMAT = 'INVALID_FIELD_FORMAT',

  // Business logic errors
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  TRANSFER_LIMIT_EXCEEDED = 'TRANSFER_LIMIT_EXCEEDED',
  INVALID_RECIPIENT = 'INVALID_RECIPIENT',
  UNSUPPORTED_CURRENCY = 'UNSUPPORTED_CURRENCY',
  UNSUPPORTED_COUNTRY = 'UNSUPPORTED_COUNTRY',

  // Transaction errors
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',
  TRANSACTION_PENDING = 'TRANSACTION_PENDING',
  TRANSACTION_DECLINED = 'TRANSACTION_DECLINED',

  // Network errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT',

  // Server errors
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',

  // Rate limiting
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',

  // Unknown
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export const ERROR_CODE_MESSAGES: Record<AfriexErrorCode, string> = {
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
```

```typescript
// packages/core/src/errors/index.ts

export * from './AfriexError';
export * from './ApiError';
export * from './ValidationError';
export * from './NetworkError';
export * from './RateLimitError';
export * from './ErrorCodes';
```

---

## Type Definitions

### Common Types

```typescript
// packages/core/src/types/common.ts

export type Currency = 'USD' | 'NGN' | 'GHS' | 'KES' | 'UGX' | 'XOF' | 'EGP' | 'PKR' | 'CAD' | 'GBP' | 'EUR';

export type Country =
  | 'US' // United States
  | 'CA' // Canada
  | 'GB' // United Kingdom
  | 'NG' // Nigeria
  | 'GH' // Ghana
  | 'KE' // Kenya
  | 'UG' // Uganda
  | 'CM' // Cameroon
  | 'CI' // Ivory Coast
  | 'EG' // Egypt
  | 'ET' // Ethiopia
  | 'PK' // Pakistan
  | 'FR' // France
  | 'DE' // Germany
  | 'IT' // Italy
  | 'ES' // Spain
  | 'IE' // Ireland
  | 'NL' // Netherlands
  | 'RO' // Romania
  | 'BE'; // Belgium

export enum TransactionStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  BANK_ACCOUNT = 'bank_account',
  DEBIT_CARD = 'debit_card',
  WALLET = 'wallet',
  MOBILE_MONEY = 'mobile_money',
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
    nextCursor?: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

export interface Money {
  amount: number;
  currency: Currency;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country: Country;
}
```

### API Types

```typescript
// packages/core/src/types/api.ts

export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  timestamp: string;
}
```

---

## API Modules

### Transfer Service

```typescript
// packages/transfers/src/types.ts

import {
  Currency,
  Country,
  TransactionStatus,
  PaymentMethod,
  Money,
  Timestamps,
  PaginationParams,
  PaginatedResponse,
} from '@afriex/core/types';

export enum TransferType {
  BANK = 'bank',
  MOBILE_MONEY = 'mobile_money',
  WALLET = 'wallet',
}

export interface BankDetails {
  bankCode: string;
  accountNumber: string;
  accountName: string;
}

export interface MobileMoneyDetails {
  provider: string;
  phoneNumber: string;
}

export interface CreateTransferRequest {
  recipientId?: string;
  type: TransferType;
  amount: number;
  sourceCurrency: Currency;
  destinationCurrency: Currency;
  destinationCountry: Country;
  bankDetails?: BankDetails;
  mobileMoneyDetails?: MobileMoneyDetails;
  walletId?: string;
  reference?: string;
  purpose?: string;
  metadata?: Record<string, any>;
}

export interface Transfer extends Timestamps {
  id: string;
  reference: string;
  type: TransferType;
  status: TransactionStatus;
  amount: Money;
  sourceAmount: Money;
  destinationAmount: Money;
  exchangeRate: number;
  fee: Money;
  recipientId?: string;
  bankDetails?: BankDetails;
  mobileMoneyDetails?: MobileMoneyDetails;
  walletId?: string;
  purpose?: string;
  metadata?: Record<string, any>;
  failureReason?: string;
}

export interface TransferQuoteRequest {
  amount: number;
  sourceCurrency: Currency;
  destinationCurrency: Currency;
  destinationCountry: Country;
}

export interface TransferQuote {
  sourceAmount: Money;
  destinationAmount: Money;
  exchangeRate: number;
  fee: Money;
  totalAmount: Money;
  expiresAt: string;
}

export interface ListTransfersParams extends PaginationParams {
  status?: TransactionStatus;
  startDate?: string;
  endDate?: string;
  recipientId?: string;
}
```

```typescript
// packages/transfers/src/TransferService.ts

import { HttpClient } from '@afriex/core/client';
import { ValidationError } from '@afriex/core/errors';
import {
  CreateTransferRequest,
  Transfer,
  TransferQuote,
  TransferQuoteRequest,
  ListTransfersParams,
} from './types';
import { PaginatedResponse } from '@afriex/core/types';

export class TransferService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Create a new transfer
   */
  async create(request: CreateTransferRequest): Promise<Transfer> {
    this.validateCreateTransferRequest(request);

    return this.httpClient.post<Transfer>('/v1/transfers', request);
  }

  /**
   * Get a transfer by ID
   */
  async get(transferId: string): Promise<Transfer> {
    if (!transferId) {
      throw new ValidationError('Transfer ID is required');
    }

    return this.httpClient.get<Transfer>(`/v1/transfers/${transferId}`);
  }

  /**
   * List all transfers
   */
  async list(
    params?: ListTransfersParams
  ): Promise<PaginatedResponse<Transfer>> {
    return this.httpClient.get<PaginatedResponse<Transfer>>('/v1/transfers', {
      params,
    });
  }

  /**
   * Get a transfer quote
   */
  async getQuote(request: TransferQuoteRequest): Promise<TransferQuote> {
    this.validateQuoteRequest(request);

    return this.httpClient.post<TransferQuote>('/v1/transfers/quote', request);
  }

  /**
   * Cancel a transfer
   */
  async cancel(transferId: string): Promise<Transfer> {
    if (!transferId) {
      throw new ValidationError('Transfer ID is required');
    }

    return this.httpClient.post<Transfer>(
      `/v1/transfers/${transferId}/cancel`
    );
  }

  private validateCreateTransferRequest(request: CreateTransferRequest): void {
    const errors: Array<{ field: string; message: string }> = [];

    if (!request.type) {
      errors.push({ field: 'type', message: 'Transfer type is required' });
    }

    if (!request.amount || request.amount <= 0) {
      errors.push({
        field: 'amount',
        message: 'Amount must be greater than 0',
      });
    }

    if (!request.sourceCurrency) {
      errors.push({
        field: 'sourceCurrency',
        message: 'Source currency is required',
      });
    }

    if (!request.destinationCurrency) {
      errors.push({
        field: 'destinationCurrency',
        message: 'Destination currency is required',
      });
    }

    if (!request.destinationCountry) {
      errors.push({
        field: 'destinationCountry',
        message: 'Destination country is required',
      });
    }

    if (request.type === 'bank' && !request.bankDetails) {
      errors.push({
        field: 'bankDetails',
        message: 'Bank details are required for bank transfers',
      });
    }

    if (request.type === 'mobile_money' && !request.mobileMoneyDetails) {
      errors.push({
        field: 'mobileMoneyDetails',
        message: 'Mobile money details are required for mobile money transfers',
      });
    }

    if (request.type === 'wallet' && !request.walletId) {
      errors.push({
        field: 'walletId',
        message: 'Wallet ID is required for wallet transfers',
      });
    }

    if (errors.length > 0) {
      throw new ValidationError('Validation failed', errors);
    }
  }

  private validateQuoteRequest(request: TransferQuoteRequest): void {
    const errors: Array<{ field: string; message: string }> = [];

    if (!request.amount || request.amount <= 0) {
      errors.push({
        field: 'amount',
        message: 'Amount must be greater than 0',
      });
    }

    if (!request.sourceCurrency) {
      errors.push({
        field: 'sourceCurrency',
        message: 'Source currency is required',
      });
    }

    if (!request.destinationCurrency) {
      errors.push({
        field: 'destinationCurrency',
        message: 'Destination currency is required',
      });
    }

    if (!request.destinationCountry) {
      errors.push({
        field: 'destinationCountry',
        message: 'Destination country is required',
      });
    }

    if (errors.length > 0) {
      throw new ValidationError('Validation failed', errors);
    }
  }
}
```

### Wallet Service

```typescript
// packages/wallets/src/types.ts

import {
  Currency,
  Money,
  Timestamps,
  PaginationParams,
  TransactionStatus,
} from '@afriex/core/types';

export enum WalletType {
  PERSONAL = 'personal',
  BUSINESS = 'business',
}

export interface Wallet extends Timestamps {
  id: string;
  type: WalletType;
  currency: Currency;
  balance: Money;
  availableBalance: Money;
  status: 'active' | 'frozen' | 'closed';
}

export interface CreateWalletRequest {
  type: WalletType;
  currency: Currency;
}

export interface WalletTransaction extends Timestamps {
  id: string;
  walletId: string;
  type: 'credit' | 'debit';
  amount: Money;
  balance: Money;
  status: TransactionStatus;
  description: string;
  reference: string;
  metadata?: Record<string, any>;
}

export interface ListWalletTransactionsParams extends PaginationParams {
  startDate?: string;
  endDate?: string;
  type?: 'credit' | 'debit';
}

export interface FundWalletRequest {
  walletId: string;
  amount: number;
  paymentMethod: 'bank_account' | 'debit_card';
  paymentMethodId?: string;
}

export interface WithdrawFromWalletRequest {
  walletId: string;
  amount: number;
  destinationType: 'bank_account' | 'debit_card';
  destinationId: string;
}
```

```typescript
// packages/wallets/src/WalletService.ts

import { HttpClient } from '@afriex/core/client';
import { ValidationError } from '@afriex/core/errors';
import { PaginatedResponse } from '@afriex/core/types';
import {
  Wallet,
  CreateWalletRequest,
  WalletTransaction,
  ListWalletTransactionsParams,
  FundWalletRequest,
  WithdrawFromWalletRequest,
} from './types';

export class WalletService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Create a new wallet
   */
  async create(request: CreateWalletRequest): Promise<Wallet> {
    if (!request.type || !request.currency) {
      throw new ValidationError('Wallet type and currency are required');
    }

    return this.httpClient.post<Wallet>('/v1/wallets', request);
  }

  /**
   * Get a wallet by ID
   */
  async get(walletId: string): Promise<Wallet> {
    if (!walletId) {
      throw new ValidationError('Wallet ID is required');
    }

    return this.httpClient.get<Wallet>(`/v1/wallets/${walletId}`);
  }

  /**
   * List all wallets
   */
  async list(): Promise<Wallet[]> {
    const response = await this.httpClient.get<{ data: Wallet[] }>(
      '/v1/wallets'
    );
    return response.data;
  }

  /**
   * Get wallet balance
   */
  async getBalance(walletId: string): Promise<Money> {
    if (!walletId) {
      throw new ValidationError('Wallet ID is required');
    }

    const wallet = await this.get(walletId);
    return wallet.balance;
  }

  /**
   * List wallet transactions
   */
  async listTransactions(
    walletId: string,
    params?: ListWalletTransactionsParams
  ): Promise<PaginatedResponse<WalletTransaction>> {
    if (!walletId) {
      throw new ValidationError('Wallet ID is required');
    }

    return this.httpClient.get<PaginatedResponse<WalletTransaction>>(
      `/v1/wallets/${walletId}/transactions`,
      { params }
    );
  }

  /**
   * Fund a wallet
   */
  async fund(request: FundWalletRequest): Promise<WalletTransaction> {
    if (!request.walletId) {
      throw new ValidationError('Wallet ID is required');
    }

    if (!request.amount || request.amount <= 0) {
      throw new ValidationError('Amount must be greater than 0');
    }

    return this.httpClient.post<WalletTransaction>(
      `/v1/wallets/${request.walletId}/fund`,
      request
    );
  }

  /**
   * Withdraw from a wallet
   */
  async withdraw(request: WithdrawFromWalletRequest): Promise<WalletTransaction> {
    if (!request.walletId) {
      throw new ValidationError('Wallet ID is required');
    }

    if (!request.amount || request.amount <= 0) {
      throw new ValidationError('Amount must be greater than 0');
    }

    return this.httpClient.post<WalletTransaction>(
      `/v1/wallets/${request.walletId}/withdraw`,
      request
    );
  }
}
```

### Recipient Service

```typescript
// packages/recipients/src/types.ts

import {
  Country,
  Currency,
  Timestamps,
  PaginationParams,
} from '@afriex/core/types';

export interface Recipient extends Timestamps {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  country: Country;
  currency: Currency;
  bankDetails?: {
    bankCode: string;
    accountNumber: string;
    accountName: string;
  };
  mobileMoneyDetails?: {
    provider: string;
    phoneNumber: string;
  };
  metadata?: Record<string, any>;
}

export interface CreateRecipientRequest {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  country: Country;
  currency: Currency;
  bankDetails?: {
    bankCode: string;
    accountNumber: string;
    accountName: string;
  };
  mobileMoneyDetails?: {
    provider: string;
    phoneNumber: string;
  };
  metadata?: Record<string, any>;
}

export interface UpdateRecipientRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  metadata?: Record<string, any>;
}

export interface ListRecipientsParams extends PaginationParams {
  country?: Country;
  search?: string;
}
```

```typescript
// packages/recipients/src/RecipientService.ts

import { HttpClient } from '@afriex/core/client';
import { ValidationError } from '@afriex/core/errors';
import { PaginatedResponse } from '@afriex/core/types';
import {
  Recipient,
  CreateRecipientRequest,
  UpdateRecipientRequest,
  ListRecipientsParams,
} from './types';

export class RecipientService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Create a new recipient
   */
  async create(request: CreateRecipientRequest): Promise<Recipient> {
    this.validateCreateRequest(request);

    return this.httpClient.post<Recipient>('/v1/recipients', request);
  }

  /**
   * Get a recipient by ID
   */
  async get(recipientId: string): Promise<Recipient> {
    if (!recipientId) {
      throw new ValidationError('Recipient ID is required');
    }

    return this.httpClient.get<Recipient>(`/v1/recipients/${recipientId}`);
  }

  /**
   * List all recipients
   */
  async list(
    params?: ListRecipientsParams
  ): Promise<PaginatedResponse<Recipient>> {
    return this.httpClient.get<PaginatedResponse<Recipient>>(
      '/v1/recipients',
      { params }
    );
  }

  /**
   * Update a recipient
   */
  async update(
    recipientId: string,
    request: UpdateRecipientRequest
  ): Promise<Recipient> {
    if (!recipientId) {
      throw new ValidationError('Recipient ID is required');
    }

    return this.httpClient.patch<Recipient>(
      `/v1/recipients/${recipientId}`,
      request
    );
  }

  /**
   * Delete a recipient
   */
  async delete(recipientId: string): Promise<void> {
    if (!recipientId) {
      throw new ValidationError('Recipient ID is required');
    }

    await this.httpClient.delete(`/v1/recipients/${recipientId}`);
  }

  private validateCreateRequest(request: CreateRecipientRequest): void {
    const errors: Array<{ field: string; message: string }> = [];

    if (!request.firstName) {
      errors.push({ field: 'firstName', message: 'First name is required' });
    }

    if (!request.lastName) {
      errors.push({ field: 'lastName', message: 'Last name is required' });
    }

    if (!request.country) {
      errors.push({ field: 'country', message: 'Country is required' });
    }

    if (!request.currency) {
      errors.push({ field: 'currency', message: 'Currency is required' });
    }

    if (!request.bankDetails && !request.mobileMoneyDetails) {
      errors.push({
        field: 'paymentDetails',
        message: 'Either bank details or mobile money details are required',
      });
    }

    if (errors.length > 0) {
      throw new ValidationError('Validation failed', errors);
    }
  }
}
```

### Rate Service

```typescript
// packages/rates/src/types.ts

import { Currency, Country } from '@afriex/core/types';

export interface ExchangeRate {
  sourceCurrency: Currency;
  destinationCurrency: Currency;
  rate: number;
  inverseRate: number;
  timestamp: string;
}

export interface GetRateRequest {
  sourceCurrency: Currency;
  destinationCurrency: Currency;
  amount?: number;
}

export interface ConversionResult {
  sourceAmount: number;
  destinationAmount: number;
  sourceCurrency: Currency;
  destinationCurrency: Currency;
  rate: number;
  timestamp: string;
}
```

```typescript
// packages/rates/src/RateService.ts

import { HttpClient } from '@afriex/core/client';
import { ValidationError } from '@afriex/core/errors';
import { ExchangeRate, GetRateRequest, ConversionResult } from './types';

export class RateService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Get exchange rate between two currencies
   */
  async getRate(request: GetRateRequest): Promise<ExchangeRate> {
    if (!request.sourceCurrency || !request.destinationCurrency) {
      throw new ValidationError('Source and destination currencies are required');
    }

    return this.httpClient.get<ExchangeRate>('/v1/rates', {
      params: {
        from: request.sourceCurrency,
        to: request.destinationCurrency,
      },
    });
  }

  /**
   * Convert amount from one currency to another
   */
  async convert(request: GetRateRequest): Promise<ConversionResult> {
    if (!request.sourceCurrency || !request.destinationCurrency) {
      throw new ValidationError('Source and destination currencies are required');
    }

    if (!request.amount || request.amount <= 0) {
      throw new ValidationError('Amount must be greater than 0');
    }

    return this.httpClient.get<ConversionResult>('/v1/rates/convert', {
      params: {
        from: request.sourceCurrency,
        to: request.destinationCurrency,
        amount: request.amount,
      },
    });
  }

  /**
   * Get all available exchange rates
   */
  async getAllRates(baseCurrency?: Currency): Promise<ExchangeRate[]> {
    const response = await this.httpClient.get<{ data: ExchangeRate[] }>(
      '/v1/rates/all',
      {
        params: baseCurrency ? { base: baseCurrency } : undefined,
      }
    );

    return response.data;
  }
}
```

### Webhook Service

```typescript
// packages/webhooks/src/types.ts

import { TransactionStatus } from '@afriex/core/types';

export enum WebhookEventType {
  TRANSFER_CREATED = 'transfer.created',
  TRANSFER_COMPLETED = 'transfer.completed',
  TRANSFER_FAILED = 'transfer.failed',
  WALLET_FUNDED = 'wallet.funded',
  WALLET_WITHDRAWN = 'wallet.withdrawn',
}

export interface WebhookEvent {
  id: string;
  type: WebhookEventType;
  createdAt: string;
  data: any;
}

export interface WebhookPayload {
  event: WebhookEvent;
  signature: string;
  timestamp: string;
}
```

```typescript
// packages/webhooks/src/WebhookVerifier.ts

import crypto from 'crypto';
import { WebhookPayload } from './types';

export class WebhookVerifier {
  private webhookSecret: string;

  constructor(webhookSecret: string) {
    if (!webhookSecret) {
      throw new Error('Webhook secret is required');
    }
    this.webhookSecret = webhookSecret;
  }

  /**
   * Verify webhook signature
   */
  verify(payload: string, signature: string, timestamp: string): boolean {
    const expectedSignature = this.generateSignature(payload, timestamp);
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }

  /**
   * Verify and parse webhook payload
   */
  verifyAndParse(
    rawPayload: string,
    signature: string,
    timestamp: string,
    toleranceInSeconds: number = 300
  ): WebhookPayload {
    // Check timestamp to prevent replay attacks
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const payloadTimestamp = parseInt(timestamp, 10);

    if (currentTimestamp - payloadTimestamp > toleranceInSeconds) {
      throw new Error('Webhook timestamp is too old');
    }

    // Verify signature
    if (!this.verify(rawPayload, signature, timestamp)) {
      throw new Error('Invalid webhook signature');
    }

    // Parse payload
    return JSON.parse(rawPayload);
  }

  private generateSignature(payload: string, timestamp: string): string {
    const signedPayload = `${timestamp}.${payload}`;
    return crypto
      .createHmac('sha256', this.webhookSecret)
      .update(signedPayload)
      .digest('hex');
  }
}
```

```typescript
// packages/webhooks/src/WebhookService.ts

import { HttpClient } from '@afriex/core/client';
import { ValidationError } from '@afriex/core/errors';
import { WebhookVerifier } from './WebhookVerifier';
import { WebhookEventType, WebhookPayload } from './types';

export interface WebhookEndpoint {
  id: string;
  url: string;
  events: WebhookEventType[];
  status: 'active' | 'disabled';
  createdAt: string;
}

export interface CreateWebhookRequest {
  url: string;
  events: WebhookEventType[];
}

export class WebhookService {
  private httpClient: HttpClient;
  private verifier?: WebhookVerifier;

  constructor(httpClient: HttpClient, webhookSecret?: string) {
    this.httpClient = httpClient;

    if (webhookSecret) {
      this.verifier = new WebhookVerifier(webhookSecret);
    }
  }

  /**
   * Create a webhook endpoint
   */
  async create(request: CreateWebhookRequest): Promise<WebhookEndpoint> {
    if (!request.url) {
      throw new ValidationError('Webhook URL is required');
    }

    if (!request.events || request.events.length === 0) {
      throw new ValidationError('At least one event type is required');
    }

    return this.httpClient.post<WebhookEndpoint>('/v1/webhooks', request);
  }

  /**
   * Get a webhook endpoint
   */
  async get(webhookId: string): Promise<WebhookEndpoint> {
    if (!webhookId) {
      throw new ValidationError('Webhook ID is required');
    }

    return this.httpClient.get<WebhookEndpoint>(`/v1/webhooks/${webhookId}`);
  }

  /**
   * List all webhook endpoints
   */
  async list(): Promise<WebhookEndpoint[]> {
    const response = await this.httpClient.get<{ data: WebhookEndpoint[] }>(
      '/v1/webhooks'
    );
    return response.data;
  }

  /**
   * Delete a webhook endpoint
   */
  async delete(webhookId: string): Promise<void> {
    if (!webhookId) {
      throw new ValidationError('Webhook ID is required');
    }

    await this.httpClient.delete(`/v1/webhooks/${webhookId}`);
  }

  /**
   * Verify webhook signature
   */
  verifySignature(
    rawPayload: string,
    signature: string,
    timestamp: string
  ): boolean {
    if (!this.verifier) {
      throw new Error('Webhook secret not configured');
    }

    return this.verifier.verify(rawPayload, signature, timestamp);
  }

  /**
   * Verify and parse webhook payload
   */
  verifyAndParse(
    rawPayload: string,
    signature: string,
    timestamp: string
  ): WebhookPayload {
    if (!this.verifier) {
      throw new Error('Webhook secret not configured');
    }

    return this.verifier.verifyAndParse(rawPayload, signature, timestamp);
  }
}
```

### Bank Service

```typescript
// packages/banks/src/types.ts

import { Country } from '@afriex/core/types';

export interface Bank {
  code: string;
  name: string;
  country: Country;
}

export interface BankAccount {
  bankCode: string;
  accountNumber: string;
  accountName: string;
}

export interface VerifyBankAccountRequest {
  bankCode: string;
  accountNumber: string;
  country: Country;
}

export interface VerifyBankAccountResponse {
  accountNumber: string;
  accountName: string;
  bankCode: string;
  bankName: string;
  isValid: boolean;
}
```

```typescript
// packages/banks/src/BankService.ts

import { HttpClient } from '@afriex/core/client';
import { ValidationError } from '@afriex/core/errors';
import {
  Bank,
  VerifyBankAccountRequest,
  VerifyBankAccountResponse,
} from './types';
import { Country } from '@afriex/core/types';

export class BankService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Get list of supported banks for a country
   */
  async listBanks(country: Country): Promise<Bank[]> {
    if (!country) {
      throw new ValidationError('Country is required');
    }

    const response = await this.httpClient.get<{ data: Bank[] }>(
      `/v1/banks/${country}`
    );

    return response.data;
  }

  /**
   * Verify a bank account
   */
  async verifyAccount(
    request: VerifyBankAccountRequest
  ): Promise<VerifyBankAccountResponse> {
    if (!request.bankCode || !request.accountNumber || !request.country) {
      throw new ValidationError(
        'Bank code, account number, and country are required'
      );
    }

    return this.httpClient.post<VerifyBankAccountResponse>(
      '/v1/banks/verify',
      request
    );
  }
}
```

### Main SDK Package

```typescript
// packages/sdk/src/index.ts

import { AfriexClient } from '@afriex/core/client';
import { AfriexConfig } from '@afriex/core/config';
import { TransferService } from '@afriex/transfers';
import { WalletService } from '@afriex/wallets';
import { RecipientService } from '@afriex/recipients';
import { RateService } from '@afriex/rates';
import { WebhookService } from '@afriex/webhooks';
import { BankService } from '@afriex/banks';

export class AfriexSDK extends AfriexClient {
  public readonly transfers: TransferService;
  public readonly wallets: WalletService;
  public readonly recipients: RecipientService;
  public readonly rates: RateService;
  public readonly webhooks: WebhookService;
  public readonly banks: BankService;

  constructor(config: AfriexConfig) {
    super(config);

    const httpClient = this.getHttpClient();

    this.transfers = new TransferService(httpClient);
    this.wallets = new WalletService(httpClient);
    this.recipients = new RecipientService(httpClient);
    this.rates = new RateService(httpClient);
    this.webhooks = new WebhookService(httpClient, config.webhookSecret);
    this.banks = new BankService(httpClient);
  }
}

// Re-export all types
export * from '@afriex/core/types';
export * from '@afriex/core/errors';
export * from '@afriex/core/config';
export * from '@afriex/transfers';
export * from '@afriex/wallets';
export * from '@afriex/recipients';
export * from '@afriex/rates';
export * from '@afriex/webhooks';
export * from '@afriex/banks';
```

---

## Testing Strategy

### Unit Tests Example

```typescript
// packages/transfers/tests/TransferService.test.ts

import { TransferService } from '../src/TransferService';
import { HttpClient } from '@afriex/core/client';
import { ValidationError } from '@afriex/core/errors';

jest.mock('@afriex/core/client');

describe('TransferService', () => {
  let transferService: TransferService;
  let mockHttpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttpClient = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    } as any;

    transferService = new TransferService(mockHttpClient);
  });

  describe('create', () => {
    it('should create a transfer successfully', async () => {
      const request = {
        type: 'bank' as const,
        amount: 100,
        sourceCurrency: 'USD' as const,
        destinationCurrency: 'NGN' as const,
        destinationCountry: 'NG' as const,
        bankDetails: {
          bankCode: '044',
          accountNumber: '1234567890',
          accountName: 'John Doe',
        },
      };

      const mockResponse = {
        id: 'transfer_123',
        ...request,
        status: 'pending',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await transferService.create(request);

      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/v1/transfers',
        request
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw validation error for invalid request', async () => {
      const request = {
        type: 'bank' as const,
        amount: -100, // Invalid amount
        sourceCurrency: 'USD' as const,
        destinationCurrency: 'NGN' as const,
        destinationCountry: 'NG' as const,
      };

      await expect(transferService.create(request as any)).rejects.toThrow(
        ValidationError
      );
    });
  });

  describe('get', () => {
    it('should get a transfer by ID', async () => {
      const transferId = 'transfer_123';
      const mockResponse = {
        id: transferId,
        status: 'completed',
      };

      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await transferService.get(transferId);

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        `/v1/transfers/${transferId}`
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw validation error for missing ID', async () => {
      await expect(transferService.get('')).rejects.toThrow(ValidationError);
    });
  });
});
```

---

## Build & Deployment

### Package.json (Root)

```json
{
  "name": "@afriex/monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "clean": "turbo run clean",
    "dev": "turbo run dev --parallel",
    "changeset": "changeset",
    "version": "changeset version",
    "release": "turbo run build && changeset publish"
  },
  "devDependencies": {
    "@changesets/cli": "^2.27.1",
    "@types/node": "^20.11.0",
    "turbo": "^1.12.0",
    "typescript": "^5.3.3"
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  },
  "packageManager": "pnpm@8.15.0"
}
```

### Turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "lint": {
      "outputs": []
    },
    "type-check": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "clean": {
      "cache": false
    }
  }
}
```

### TSConfig (Base)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "moduleResolution": "node",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"]
}
```

---

## Usage Examples

### Basic Usage

```typescript
import { AfriexSDK, Environment } from '@afriex/sdk';

// Initialize the SDK
const afriex = new AfriexSDK({
  apiKey: process.env.AFRIEX_API_KEY!,
  environment: Environment.STAGING,
  enableLogging: true,
});

// Create a transfer
async function sendMoney() {
  try {
    // Get exchange rate quote
    const quote = await afriex.transfers.getQuote({
      amount: 100,
      sourceCurrency: 'USD',
      destinationCurrency: 'NGN',
      destinationCountry: 'NG',
    });

    console.log('Exchange rate:', quote.exchangeRate);
    console.log('Recipient will receive:', quote.destinationAmount);

    // Create recipient
    const recipient = await afriex.recipients.create({
      firstName: 'John',
      lastName: 'Doe',
      country: 'NG',
      currency: 'NGN',
      bankDetails: {
        bankCode: '044',
        accountNumber: '1234567890',
        accountName: 'John Doe',
      },
    });

    // Create transfer
    const transfer = await afriex.transfers.create({
      recipientId: recipient.id,
      type: 'bank',
      amount: 100,
      sourceCurrency: 'USD',
      destinationCurrency: 'NGN',
      destinationCountry: 'NG',
      reference: 'Payment for services',
    });

    console.log('Transfer created:', transfer.id);
    console.log('Status:', transfer.status);
  } catch (error) {
    if (error instanceof ApiError) {
      console.error('API Error:', error.message);
      console.error('Error code:', error.errorCode);
      console.error('Status code:', error.statusCode);
    } else {
      console.error('Error:', error);
    }
  }
}

sendMoney();
```

### Webhook Handling (Express)

```typescript
import express from 'express';
import { AfriexSDK, Environment } from '@afriex/sdk';

const app = express();

// Use raw body for webhook verification
app.use('/webhooks/afriex', express.raw({ type: 'application/json' }));

const afriex = new AfriexSDK({
  apiKey: process.env.AFRIEX_API_KEY!,
  environment: Environment.PRODUCTION,
  webhookSecret: process.env.AFRIEX_WEBHOOK_SECRET!,
});

app.post('/webhooks/afriex', (req, res) => {
  const signature = req.headers['x-afriex-signature'] as string;
  const timestamp = req.headers['x-afriex-timestamp'] as string;
  const rawBody = req.body.toString();

  try {
    // Verify and parse webhook
    const payload = afriex.webhooks.verifyAndParse(
      rawBody,
      signature,
      timestamp
    );

    console.log('Webhook event:', payload.event.type);

    // Handle different event types
    switch (payload.event.type) {
      case 'transfer.completed':
        console.log('Transfer completed:', payload.event.data);
        break;
      case 'transfer.failed':
        console.log('Transfer failed:', payload.event.data);
        break;
      default:
        console.log('Unhandled event type:', payload.event.type);
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook verification failed:', error);
    res.status(400).send('Invalid signature');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Advanced: Retry Logic & Error Handling

```typescript
import { AfriexSDK, ApiError, NetworkError, RateLimitError } from '@afriex/sdk';

const afriex = new AfriexSDK({
  apiKey: process.env.AFRIEX_API_KEY!,
  environment: Environment.PRODUCTION,
  retryConfig: {
    maxRetries: 5,
    retryDelay: 2000,
    retryableStatusCodes: [408, 429, 500, 502, 503, 504],
  },
});

async function transferWithRetry() {
  try {
    const transfer = await afriex.transfers.create({
      type: 'bank',
      amount: 100,
      sourceCurrency: 'USD',
      destinationCurrency: 'NGN',
      destinationCountry: 'NG',
      bankDetails: {
        bankCode: '044',
        accountNumber: '1234567890',
        accountName: 'John Doe',
      },
    });

    return transfer;
  } catch (error) {
    if (error instanceof RateLimitError) {
      // Wait for the specified retry-after period
      const retryAfter = error.retryAfter || 60;
      console.log(`Rate limited. Retry after ${retryAfter} seconds`);

      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));

      // Retry the request
      return transferWithRetry();
    } else if (error instanceof ApiError) {
      console.error('API Error:', {
        message: error.message,
        code: error.errorCode,
        status: error.statusCode,
        details: error.details,
      });

      throw error;
    } else if (error instanceof NetworkError) {
      console.error('Network Error:', error.message);
      throw error;
    } else {
      console.error('Unknown Error:', error);
      throw error;
    }
  }
}
```

---

## Utilities

### Logger

```typescript
// packages/core/src/utils/logger.ts

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  NONE = 'none',
}

const LOG_LEVEL_PRIORITY = {
  [LogLevel.DEBUG]: 0,
  [LogLevel.INFO]: 1,
  [LogLevel.WARN]: 2,
  [LogLevel.ERROR]: 3,
  [LogLevel.NONE]: 4,
};

export class Logger {
  constructor(
    private level: LogLevel = LogLevel.ERROR,
    private enabled: boolean = true
  ) {}

  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, data?: any): void {
    this.log(LogLevel.ERROR, message, data);
  }

  private log(level: LogLevel, message: string, data?: any): void {
    if (!this.enabled || !this.shouldLog(level)) {
      return;
    }

    const timestamp = new Date().toISOString();
    const prefix = `[Afriex SDK] [${timestamp}] [${level.toUpperCase()}]`;

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(prefix, message, data || '');
        break;
      case LogLevel.INFO:
        console.info(prefix, message, data || '');
        break;
      case LogLevel.WARN:
        console.warn(prefix, message, data || '');
        break;
      case LogLevel.ERROR:
        console.error(prefix, message, data || '');
        break;
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.level];
  }
}
```

### Validators

```typescript
// packages/core/src/utils/validators.ts

import { Currency, Country } from '../types/common';

export const SUPPORTED_CURRENCIES: Currency[] = [
  'USD', 'NGN', 'GHS', 'KES', 'UGX', 'XOF', 'EGP', 'PKR', 'CAD', 'GBP', 'EUR',
];

export const SUPPORTED_COUNTRIES: Country[] = [
  'US', 'CA', 'GB', 'NG', 'GH', 'KE', 'UG', 'CM', 'CI', 'EG', 'ET', 'PK',
  'FR', 'DE', 'IT', 'ES', 'IE', 'NL', 'RO', 'BE',
];

export function isValidCurrency(currency: string): currency is Currency {
  return SUPPORTED_CURRENCIES.includes(currency as Currency);
}

export function isValidCountry(country: string): country is Country {
  return SUPPORTED_COUNTRIES.includes(country as Country);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhoneNumber(phoneNumber: string): boolean {
  // Basic validation - can be enhanced based on requirements
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phoneNumber);
}

export function isValidAmount(amount: number): boolean {
  return typeof amount === 'number' && amount > 0 && isFinite(amount);
}
```

---

## Documentation

### README.md

```markdown
# Afriex TypeScript SDK

Official TypeScript SDK for the Afriex Business API.

## Installation

```bash
npm install @afriex/sdk
# or
yarn add @afriex/sdk
# or
pnpm add @afriex/sdk
```

## Quick Start

```typescript
import { AfriexSDK, Environment } from '@afriex/sdk';

const afriex = new AfriexSDK({
  apiKey: 'your-api-key',
  environment: Environment.PRODUCTION,
});

// Send money
const transfer = await afriex.transfers.create({
  type: 'bank',
  amount: 100,
  sourceCurrency: 'USD',
  destinationCurrency: 'NGN',
  destinationCountry: 'NG',
  bankDetails: {
    bankCode: '044',
    accountNumber: '1234567890',
    accountName: 'John Doe',
  },
});

console.log('Transfer ID:', transfer.id);
```

## Features

- ✅ Type-safe API with full TypeScript support
- ✅ Comprehensive error handling
- ✅ Automatic retry logic
- ✅ Webhook signature verification
- ✅ Rate limiting support
- ✅ Tree-shakable modular design
- ✅ Extensive test coverage
- ✅ Production-ready

## License

MIT
```

---

## Additional Recommendations

### 1. CI/CD Pipeline (.github/workflows/ci.yml)

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm run lint
      - run: pnpm run type-check
      - run: pnpm run test
      - run: pnpm run build
```

### 2. Security Best Practices

- Never log API keys or sensitive data
- Use environment variables for configuration
- Implement rate limiting on client side
- Validate all inputs before sending to API
- Use HTTPS only
- Implement proper error handling
- Sanitize user inputs

### 3. Performance Optimizations

- Implement request caching where appropriate
- Use connection pooling
- Implement request deduplication
- Use streaming for large responses
- Implement pagination for list endpoints
- Use compression

---

## Conclusion

This implementation guide provides a comprehensive, production-ready TypeScript SDK for the Afriex Business API. The monorepo structure allows for modular development, easy testing, and efficient maintenance. The SDK is designed with best practices in mind, including robust error handling, type safety, and extensive documentation.

### Next Steps

1. Review and adapt the implementation based on actual API documentation
2. Add missing endpoints once full API spec is available
3. Implement comprehensive test suite
4. Set up CI/CD pipeline
5. Write detailed API documentation
6. Create example projects
7. Publish to npm registry
