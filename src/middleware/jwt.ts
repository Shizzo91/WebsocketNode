import { NextFunction, Request, Response } from "express"
import { validation } from "../jwt"
import Middleware from "./Middleware"

type JWTMiddleware = {
	ignore?: string[]
}

/**
 * jwt middleware.
 * @function jwt
 * @returns {Middleware} - Middleware function.
 * @example
 * import express from "express"
 * import { jwt } from "./middleware"
 * app = express()
 * app.use(jwt())
 */
export default function jwt(jwtMiddleware?: JWTMiddleware): Middleware {
	const ignoreUrls: string[] = jwtMiddleware?.ignore ?? []
	return (req: Request, res: Response, next: NextFunction): void => {
		// return if the url is in the exclude list
		if (ignoreUrls.includes(req.url)) {
			next()
			return
		}

		// return if no authorization header is set
		try {
			// set the payload to the request
			//eslint-disable-next-line
			// @ts-ignore
			req.payload = validation(req.header("Authorization")?.replace("Bearer ", ""))
		} catch (e) {
			// return if the token is invalid
			res.status(401)
				.json({ error: "error" })
			return
		}

		// continue with the next middleware
		next()
	}
}