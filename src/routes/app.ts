import express, { Express, NextFunction, Request, Response } from "express"
import getLogger from "../Logger/getLogger"
import { Logger } from "winston"
import api from "./api"
const logger: Logger = getLogger("app")

const app: Express = express()

// express app routes logging
app.use((req: Request, res: Response, next: NextFunction ): void => {
	logger.debug(`${req.method.toUpperCase()} ${req.url}`)
	next()
})

// adding the app routes to app
app.use("/api", api)



export default app