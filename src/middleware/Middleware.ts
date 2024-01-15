import { NextFunction, Request, Response } from "express"

/**
 * Middleware type.
 * @type {Middleware}
 * @param {Request} req - The request.
 * @param {Response} res - The response.
 * @param {NextFunction} next - The next middleware.
 * @returns {void}
 */
type Middleware = (req: Request, res: Response, next: NextFunction) => void
export default Middleware