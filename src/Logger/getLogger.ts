import winston, { Logger, format } from "winston"
import { createLogger as createWinstonLogger } from "winston"
import { padEnd, padStart } from "lodash"
import { maxKeyLength, screamCase } from "../Utils"
import { PROD } from "../settings"

/**
 * length of max level
 */
const LENGTH_OF_MAX_LEVEL: number = maxKeyLength(winston.config.syslog.levels)

/**
 * logger map for caching
 * @private
 */
type LoggerMap = {
	[name: string]: Logger
}

/**
 * logger map for caching
 */
const loggerMap: LoggerMap = {}

/**
 * return format for winston logger
 * @private
 * @param isConsole
 * @returns {winston.Logform.Format}
 */
function getFormat(isConsole: boolean = false): winston.Logform.Format {
	const formatList: winston.Logform.Format[] = [
		format.simple(),
		format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss.SSS"
		}),
		format.printf(({ timestamp, level, message, service }: winston.Logform.TransformableInfo): string => {
			const nameFormatted: string = padStart(service, maxKeyLength(loggerMap), " ")
			const levelFormatted: string = padEnd(level.toUpperCase(), LENGTH_OF_MAX_LEVEL, " ")

			return `[${timestamp}] ${nameFormatted}.${levelFormatted} : ${message}`
		}
		)
	]

	if (isConsole) {
		formatList.push(format.colorize({ all: true }))
	}


	return format.combine(...formatList)
}

/**
 * create winston logger
 * @private
 * @param name
 * @returns {winston.Logger}
 */
function createLogger(name: string): Logger {
	// create winston logger
	const logger: Logger = createWinstonLogger({
		levels: winston.config.syslog.levels,
		transports: [
			new winston.transports.Console({
				level: (!PROD) ? "debug" : "info",
				format: getFormat(true)
			}),
			new winston.transports.File( {
				level: "error",
				filename: "error.log",
				format: getFormat(false)
			}),
		],
		defaultMeta: {
			service: name
		},
	})

	// cache logger
	loggerMap[name] = logger

	// return logger
	return logger
}

/**
 * create or get winston logger instance if exists
 * @param name
 * @returns {winston.Logger}
 * @example
 * import { getLogger, Logger } from "./Logger"
 * const logger: Logger = getLogger("test")
 * logger.info("test")
 */
export default function getLogger(name: string): Logger {
	// format name to scream case
	name = screamCase(name)

	// get logger from cache
	return loggerMap[name] ?? createLogger(name)
}

