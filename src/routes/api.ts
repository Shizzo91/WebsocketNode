import { Request, Response, Router } from "express"

const api: Router = Router()


api.get("/", (req: Request, res: Response): void => {
	res.json({
		api: "hallo"
	})
})


export default api