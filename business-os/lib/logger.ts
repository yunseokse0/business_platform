import pino from "pino";

const logger = pino({
	level: process.env.LOG_LEVEL || "info",
	base: undefined,
});

export function logInfo(message: string, meta?: unknown) {
	logger.info(meta ?? {}, message);
}

export function logError(message: string, meta?: unknown) {
	logger.error(meta ?? {}, message);
}


