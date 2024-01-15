import { getLogger, Logger } from "../Logger"
import { NextFunction, Request, Response } from "express"

/**
 * Logging middleware.
 * Logs the request method and url.
 * @param req - The request.
 * @param res - The response.
 * @param next - The next middleware.
 * @returns {void}
 * @example
 * import express from "express"
 * import logging from "./logging"
 * app = express()
 * app.use(logging)
 */
export default function logging(req: Request, res: Response, next: NextFunction ): void {
	// logger for this app
	const logger: Logger = getLogger("app")

	// continue with the next middleware
	next()

	// create the log response message
	const message: string = `${req.method.toUpperCase()} ${req.url} ${res.statusCode}`

	// log the message
	if (res.statusCode >= 400) { // 400 - 599 level error
		logger.error(message)
	} else if (res.statusCode >= 300) { // 300 - 399 level warning
		logger.warn(message)
	} else if (res.statusCode >= 200) { // 200 - 299 level info
		logger.info(message)
	} else { // 100 - 199 level debug
		logger.debug(message)
	}
}