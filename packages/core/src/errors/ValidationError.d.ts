import { AfriexError } from './AfriexError';
export interface ValidationErrorField {
    field: string;
    message: string;
    code?: string;
}
export declare class ValidationError extends AfriexError {
    readonly fields: ValidationErrorField[];
    constructor(message: string, fields?: ValidationErrorField[]);
    toJSON(): {
        fields: ValidationErrorField[];
        name: string;
        message: string;
        timestamp: Date;
        stack: string | undefined;
    };
}
//# sourceMappingURL=ValidationError.d.ts.map