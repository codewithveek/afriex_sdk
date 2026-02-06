export declare enum LogLevel {
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    NONE = "none"
}
export declare class Logger {
    private level;
    private enabled;
    constructor(level?: LogLevel, enabled?: boolean);
    debug(message: string, data?: unknown): void;
    info(message: string, data?: unknown): void;
    warn(message: string, data?: unknown): void;
    error(message: string, data?: unknown): void;
    private log;
    private shouldLog;
}
//# sourceMappingURL=logger.d.ts.map