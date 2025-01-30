import { createLogger, format, transports } from "winston";
import pc from "picocolors";

const levesl: Record<string, any> = {
    error: pc.red,
    warn: pc.yellow,
    info: pc.green,
    http: pc.cyan,
};

const formatLog = format.printf(({ level, message, timestamp }): string => {
    const levelColor = levesl[level](`${level.toUpperCase()}:`);
    return `${timestamp} ${levelColor} [ ${message} ]`;
});

export const logger = createLogger({
    level: "http",
    format: format.combine(format.timestamp(), formatLog),
    transports: [new transports.Console()],
});
