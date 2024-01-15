/**
 * JWTError class for jwtValidation
 * @class JWTError
 * @extends Error
 * @param message - error message
 * @example
 * throw new JWTError("Invalid token")
 */
export default class JWTError extends Error {
	constructor(message: string) {
		super(message)
	}
}