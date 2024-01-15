const mockNext = jest.fn()


import { jwt } from "../../src/middleware"
import { create } from "../../src/jwt"

describe("jwt middleware", () => {
	beforeEach(() => {
		jest.resetAllMocks()
		jest.resetModules()
	})

	it("should be 404", () => {
		const middle = jwt()
		const mockHeader = jest.fn()
			.mockReturnValueOnce("Bearer 123")

		const mockJson = jest.fn()
		const mockStatus = jest.fn()
			.mockReturnValueOnce({ json: mockJson })
		const req = {
			method: "GET",
			url: "/api",
			header: mockHeader,
		}
		const res = {
			status: mockStatus,
		}

		// @ts-ignore
		middle(req, res, mockNext)
		expect(mockNext).not.toHaveBeenCalled()
		expect(mockHeader).toHaveBeenCalled()
		expect(mockHeader).toHaveBeenCalledTimes(1)
		expect(mockHeader).toHaveBeenCalledWith("Authorization")
		expect(mockStatus).toHaveBeenCalled()
		expect(mockStatus).toHaveBeenCalledTimes(1)
		expect(mockStatus).toHaveBeenCalledWith(401)
		expect(mockJson).toHaveBeenCalled()
		expect(mockJson).toHaveBeenCalledTimes(1)
		expect(mockJson).toHaveBeenCalledWith({ error: "error" })
	})

	it("should be verified", () => {
		const payload = { exp: Math.floor(Date.now() / 1000) + 200, iat: Math.floor(Date.now() / 1000) - 1000 }
		const token: string = create(payload)

		const middle = jwt()
		const mockHeader = jest.fn()
			.mockReturnValueOnce(`Bearer ${token}`)

		const mockJson = jest.fn()
		const mockStatus = jest.fn()
			.mockReturnValueOnce({ json: mockJson })
		const req = {
			method: "GET",
			url: "/api",
			header: mockHeader,
		}
		const res = {
			status: mockStatus,
		}

		// @ts-ignore
		middle(req, res, mockNext)
		expect(mockNext).toHaveBeenCalled()
		expect(mockHeader).toHaveBeenCalled()
		expect(mockHeader).toHaveBeenCalledTimes(1)
		expect(mockHeader).toHaveBeenCalledWith("Authorization")
		expect(mockStatus).not.toHaveBeenCalled()
		expect(mockJson).not.toHaveBeenCalled()
		// @ts-ignore
		expect(req.payload).toEqual(payload)
	})

	it("should be ignored", () => {
		const middle = jwt({ ignore: [ "/api" ] })
		const req = {
			method: "GET",
			url: "/api",
		}
		// @ts-ignore
		middle(req, {}, mockNext)
		expect(mockNext).toHaveBeenCalled()
	})
})