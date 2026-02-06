export var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "debug";
    LogLevel["INFO"] = "info";
    LogLevel["WARN"] = "warn";
    LogLevel["ERROR"] = "error";
    LogLevel["NONE"] = "none";
})(LogLevel || (LogLevel = {}));
const LOG_LEVEL_PRIORITY = {
    [LogLevel.DEBUG]: 0,
    [LogLevel.INFO]: 1,
    [LogLevel.WARN]: 2,
    [LogLevel.ERROR]: 3,
    [LogLevel.NONE]: 4,
};
export class Logger {
    constructor(level = LogLevel.ERROR, enabled = true) {
        this.level = level;
        this.enabled = enabled;
    }
    debug(message, data) {
        this.log(LogLevel.DEBUG, message, data);
    }
    info(message, data) {
        this.log(LogLevel.INFO, message, data);
    }
    warn(message, data) {
        this.log(LogLevel.WARN, message, data);
    }
    error(message, data) {
        this.log(LogLevel.ERROR, message, data);
    }
    log(level, message, data) {
        if (!this.enabled || !this.shouldLog(level)) {
            return;
        }
        const timestamp = new Date().toISOString();
        const prefix = `[Afriex SDK] [${timestamp}] [${level.toUpperCase()}]`;
        switch (level) {
            case LogLevel.DEBUG:
                console.debug(prefix, message, data || '');
                break;
            case LogLevel.INFO:
                console.info(prefix, message, data || '');
                break;
            case LogLevel.WARN:
                console.warn(prefix, message, data || '');
                break;
            case LogLevel.ERROR:
                console.error(prefix, message, data || '');
                break;
        }
    }
    shouldLog(level) {
        return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.level];
    }
}
//# sourceMappingURL=logger.js.map