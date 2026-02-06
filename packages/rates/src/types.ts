/**
 * Rate types matching Afriex Business API
 */

export interface RatesResponse {
    rates: Record<string, Record<string, string>>;
    base: string[];
    updatedAt: number;
}

export interface GetRatesParams {
    base: string | string[];
    symbols: string | string[];
}
