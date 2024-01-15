import Payload from "./Payload"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../settings"

/**
 * Create a JWT token
 * @param payload - The payload of the token
 * @returns {string} - The token
 * @example
 * import { create } from "./jwt"
 * const token: string = create({ id: "1234567890" })
 */
export default function create(payload: Payload): string {
	return jwt.sign(payload, JWT_SECRET)
}