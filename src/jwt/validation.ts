import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "../settings"
import JWTError from "./JWTError"
import Payload from "./Payload"

/**
 * Validate a JWT token and return the payload
 * @param token - The token to validate
 * @returns {Payload} - The payload of the token
 * @example
 * import { validation } from "./jwt"
 * const payload: Payload = validation("token") // { id: "1234567890" }
 */
export default function validation(token?: string): Payload {
	if (!token) throw new JWTError("No token provided")
	let decoded: string | JwtPayload | null = null
	try {
		decoded = jwt.verify(token, JWT_SECRET)
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError && e.message === "jwt malformed") throw new JWTError("Invalid token")
		if (e instanceof jwt.JsonWebTokenError && e.message === "jwt expired") throw new JWTError("Token expired")
	}

	if (typeof decoded === "string" || decoded === null) throw new JWTError("Invalid token")

	const now: number = Math.floor(Date.now() / 1000)

	if (Number.isInteger(decoded.exp) && (decoded as Payload).exp < now) throw new JWTError("Token expired")

	if (Number.isInteger(decoded.iat) && (decoded as Payload).iat > now) throw new JWTError("Token issued in the future")

	return decoded as Payload
}