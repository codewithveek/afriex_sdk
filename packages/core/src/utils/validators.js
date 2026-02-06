export const SUPPORTED_CURRENCIES = [
    'USD', 'NGN', 'GHS', 'KES', 'UGX', 'XOF', 'EGP', 'PKR', 'CAD', 'GBP', 'EUR',
];
export const SUPPORTED_COUNTRIES = [
    'US', 'CA', 'GB', 'NG', 'GH', 'KE', 'UG', 'CM', 'CI', 'EG', 'ET', 'PK',
    'FR', 'DE', 'IT', 'ES', 'IE', 'NL', 'RO', 'BE',
];
export function isValidCurrency(currency) {
    return SUPPORTED_CURRENCIES.includes(currency);
}
export function isValidCountry(country) {
    return SUPPORTED_COUNTRIES.includes(country);
}
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export function isValidPhoneNumber(phoneNumber) {
    // Basic validation - can be enhanced based on requirements
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
}
export function isValidAmount(amount) {
    return typeof amount === 'number' && amount > 0 && isFinite(amount);
}
//# sourceMappingURL=validators.js.map