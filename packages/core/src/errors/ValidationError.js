import { AfriexError } from './AfriexError';
export class ValidationError extends AfriexError {
    constructor(message, fields = []) {
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
//# sourceMappingURL=ValidationError.js.map