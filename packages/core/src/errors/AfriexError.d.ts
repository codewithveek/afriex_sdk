export declare class AfriexError extends Error {
    readonly name: string;
    readonly timestamp: Date;
    constructor(message: string);
    toJSON(): {
        name: string;
        message: string;
        timestamp: Date;
        stack: string | undefined;
    };
}
//# sourceMappingURL=AfriexError.d.ts.map