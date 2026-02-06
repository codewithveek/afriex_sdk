export class AfriexError extends Error {
    constructor(message) {
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
//# sourceMappingURL=AfriexError.js.map