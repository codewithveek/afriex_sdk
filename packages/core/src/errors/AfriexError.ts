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
