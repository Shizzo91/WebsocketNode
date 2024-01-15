import { Request, Response, Router } from "express"
import  jwt  from "../middleware/jwt"
import PayloadRequest from "../middleware/PayloadRequest"
import simpleChatHandler from "../simpleChatHandler"

const api: Router = Router()
api.use(jwt({ ignore: [ "/" ] }))

/**
 * @api {get} /api/ Test API
 * @apiName Test
 * @apiGroup API
 * @apiVersion  0.1.0
 */
api.get("/", (req: Request, res: Response): void => {
	res.json({
		api: "hallo"
	})
})


api.get("/protection", (req: Request, res: Response): void => {
	res.json((req as PayloadRequest).payload)
})

api.get("/chat", (req: Request, res: Response): void => {
	const sendet: boolean = simpleChatHandler.sendToAll("hallo")
	res.json({ message: (sendet) ? "data has been sendet" : "data has not been sendet" })
})
export default api