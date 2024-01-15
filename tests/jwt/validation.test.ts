import { JWTError, validation, create } from "../../src/jwt"

describe("jwt validation", () => {
	it("should throw an error if no token is provided", () => {
		expect(() => {
			// @ts-ignore
			validation()
		}).toThrow(new JWTError("No token provided"))
	})

	it("should throw an error if token is invalid", () => {
		const wrongToken = "asfsafdsaf"
		expect(() => {
			validation(wrongToken)
		}).toThrow(new JWTError("Invalid token"))
	})

	it("should throw an error if token is expired", () => {
		// @ts-ignore
		const expiredToken: string = create({ exp: Math.floor(Date.now() / 1000) - 1000 })

		expect(() => {
			validation(expiredToken)
		}).toThrow(new JWTError("Token expired"))
	})

	it("should throw an error if token is issued in the future", () => {
		// @ts-ignore
		const futureToken: string = create({ exp: Math.floor(Date.now() / 1000) + 200, iat: Math.floor(Date.now() / 1000) + 1000 })

		expect(() => {
			validation(futureToken)
		}).toThrow(new JWTError("Token issued in the future"))
	})

	it("should return payload if token is valid", () => {
		const payload = { exp: Math.floor(Date.now() / 1000) + 200, iat: Math.floor(Date.now() / 1000) - 1000 }
		const token: string = create(payload)

		expect(validation(token)).toEqual(payload)
	})
})