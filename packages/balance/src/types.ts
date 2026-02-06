/**
 * Balance types matching Afriex Business API
 */

export interface BalanceResponse {
    data: Record<string, number>;
}

export interface GetBalanceParams {
    currencies: string | string[];
}
