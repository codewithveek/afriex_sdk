import { Currency, Country } from '../types/common';
export declare const SUPPORTED_CURRENCIES: Currency[];
export declare const SUPPORTED_COUNTRIES: Country[];
export declare function isValidCurrency(currency: string): currency is Currency;
export declare function isValidCountry(country: string): country is Country;
export declare function isValidEmail(email: string): boolean;
export declare function isValidPhoneNumber(phoneNumber: string): boolean;
export declare function isValidAmount(amount: number): boolean;
//# sourceMappingURL=validators.d.ts.map