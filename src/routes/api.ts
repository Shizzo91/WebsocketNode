import { Request, Response, Router } from "express"
import  jwt  from "../middleware/jwt"
import PayloadRequest from "../middleware/PayloadRequest"
import simpleChatHandler from "../simpleChatHandler"

// Init router and path
const api: Router = Router()

// Add middleware for checking the jwt
api.use(jwt({ ignore: [ "/" ] }))

/**
 * @api {get} /api/ Test API
 * @apiName Test
 * @apiGroup API
 * @apiVersion  0.1.0
 * @apiDescription Returns "hallo" as json
 */
api.get("/", (req: Request, res: Response): void => {
	res.json({
		api: "hallo"
	})
})

/**
 * @api {get} /api/protection Test API
 * @apiName Test
 * @apiGroup API
 * @apiVersion  0.1.0
 * @apiDescription Returns the payload of the JWT token
 */
api.get("/protection", (req: Request, res: Response): void => {
	res.json((req as PayloadRequest).payload)
})

/**
 * @api {get} /api/chat Test API
 * @apiName Test
 * @apiGroup API
 * @apiVersion  0.1.0
 * @apiDescription Sends "hello" to all connected clients
 */
api.get("/chat", (req: Request, res: Response): void => {
	const sendet: boolean = simpleChatHandler.sendToAll("hallo")
	res.json({ message: (sendet) ? "data has been sendet" : "data has not been sendet" })
})
export default api