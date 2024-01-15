import { JwtPayload } from "jsonwebtoken"

/**
 * Payload interface for jwtValidation
 * @interface Payload
 * @extends JwtPayload
 */
export default interface Payload extends JwtPayload {
	exp: number,
	iat: number,
}

