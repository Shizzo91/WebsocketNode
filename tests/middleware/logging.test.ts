import { getLogger, Logger } from "../../src/Logger"
import { logging } from "../../src/middleware"

jest.mock("../../src/Logger")

describe("logging", () => {
	describe("normal logging", () => {
		const next = jest.fn()
		beforeEach(() => {
			jest.resetAllMocks()
			jest.resetModules()
		})


		it("should log the request on error", () => {
			const mockError = jest.fn()
			// @ts-ignore
			getLogger.mockImplementation(() => {
				return {
					error: mockError,
				}
			})

			const res = {
				statusCode: 400,
			}
			const req = {
				method: "GET",
				url: "/",
			}
			// @ts-ignore
			logging(req, res, next)

			expect(mockError).toHaveBeenCalled()
			expect(mockError).toHaveBeenCalledTimes(1)
			expect(mockError.mock?.calls[0][0]).toBe("GET / 400")
			expect(next).toHaveBeenCalled()
			// @ts-ignore
			expect(getLogger.mock?.calls?.[0]?.[0]).toBe("app")
			expect(getLogger).toHaveBeenCalled()
			expect(getLogger).toHaveBeenCalledTimes(1)

		})

		it("should log the request on warn", () => {
			const mockWarn = jest.fn()
			// @ts-ignore
			getLogger.mockImplementation(() => {
				return {
					warn: mockWarn,
				}
			})
			const res = {
				statusCode: 300,
			}
			const req = {
				method: "GET",
				url: "/",
			}


			// @ts-ignore
			logging(req, res, next)

			expect(mockWarn).toHaveBeenCalled()
			expect(mockWarn.mock.calls[0][0]).toBe("GET / 300")
			expect(next).toHaveBeenCalled()
			// @ts-ignore
			expect(getLogger.mock?.calls?.[0]?.[0]).toBe("app")
			expect(getLogger).toHaveBeenCalled()
			expect(getLogger).toHaveBeenCalledTimes(1)

		})

		it("should log the request on info", () => {
			const mockInfo = jest.fn()
			// @ts-ignore
			getLogger.mockImplementation(() => {
				return {
					info: mockInfo,
				}
			})
			const res = {
				statusCode: 200,
			}
			const req = {
				method: "GET",
				url: "/",
			}
			// @ts-ignore
			logging(req, res, next)

			expect(mockInfo).toHaveBeenCalled()
			expect(mockInfo.mock.calls[0][0]).toBe("GET / 200")
			expect(next).toHaveBeenCalled()
			// @ts-ignore
			expect(getLogger.mock?.calls?.[0]?.[0]).toBe("app")
			expect(getLogger).toHaveBeenCalled()
			expect(getLogger).toHaveBeenCalledTimes(1)

		})

		it("should log the request on debug", () => {
			const mockDebug = jest.fn()
			// @ts-ignore
			getLogger.mockImplementation(() => {
				return {
					debug: mockDebug,
				}
			})
			const res = {
				statusCode: 100 ,
			}
			const req = {
				method: "GET",
				url: "/",
			}
			// @ts-ignore
			logging(req, res, next)

			expect(mockDebug).toHaveBeenCalled()
			expect(mockDebug.mock.calls[0][0]).toBe("GET / 100")
			expect(next).toHaveBeenCalled()
			// @ts-ignore
			expect(getLogger.mock?.calls?.[0]?.[0]).toBe("app")
			expect(getLogger).toHaveBeenCalled()
			expect(getLogger).toHaveBeenCalledTimes(1)
		})
	})

	describe("change response logging", () => {
		beforeEach(() => {
			jest.resetAllMocks()
			jest.resetModules()
		})

		it("should log the request on error", () => {
			const res = {
				statusCode: 200,
			}
			const req = {
				method: "GET",
				url: "/",
			}

			const next = jest.fn().mockImplementation(() => {
				res.statusCode = 400
			})
			const mockError = jest.fn()
			// @ts-ignore
			getLogger.mockImplementation(() => {
				return {
					error: mockError,
				}
			})


			// @ts-ignore
			logging(req, res, next)


			expect(mockError).toHaveBeenCalled()
			expect(mockError).toHaveBeenCalledTimes(1)
			expect(mockError.mock?.calls[0][0]).toBe("GET / 400")
			expect(next).toHaveBeenCalled()
			// @ts-ignore
			expect(getLogger.mock?.calls?.[0]?.[0]).toBe("app")
			expect(getLogger).toHaveBeenCalled()
			expect(getLogger).toHaveBeenCalledTimes(1)
		})

		it("should log the request on warn", () => {
			const res = {
				statusCode: 200,
			}
			const req = {
				method: "GET",
				url: "/",
			}

			const next = jest.fn().mockImplementation(() => {
				res.statusCode = 300
			})
			const mockWarn = jest.fn()
			// @ts-ignore
			getLogger.mockImplementation(() => {
				return {
					warn: mockWarn,
				}
			})


			// @ts-ignore
			logging(req, res, next)


			expect(mockWarn).toHaveBeenCalled()
			expect(mockWarn).toHaveBeenCalledTimes(1)
			expect(mockWarn.mock?.calls[0][0]).toBe("GET / 300")
			expect(next).toHaveBeenCalled()
			// @ts-ignore
			expect(getLogger.mock?.calls?.[0]?.[0]).toBe("app")
			expect(getLogger).toHaveBeenCalled()
			expect(getLogger).toHaveBeenCalledTimes(1)
		})

		it("should log the request on info", () => {
			const res = {
				statusCode: 300,
			}
			const req = {
				method: "GET",
				url: "/",
			}

			const next = jest.fn().mockImplementation(() => {
				res.statusCode = 200
			})
			const mockInfo = jest.fn()
			// @ts-ignore
			getLogger.mockImplementation(() => {
				return {
					info: mockInfo,
				}
			})


			// @ts-ignore
			logging(req, res, next)


			expect(mockInfo).toHaveBeenCalled()
			expect(mockInfo).toHaveBeenCalledTimes(1)
			expect(mockInfo.mock?.calls[0][0]).toBe("GET / 200")
			expect(next).toHaveBeenCalled()
			// @ts-ignore
			expect(getLogger.mock?.calls?.[0]?.[0]).toBe("app")
			expect(getLogger).toHaveBeenCalled()
			expect(getLogger).toHaveBeenCalledTimes(1)
		})

		it("should log the request on debug", () => {
			const res = {
				statusCode: 200,
			}
			const req = {
				method: "GET",
				url: "/",
			}

			const next = jest.fn().mockImplementation(() => {
				res.statusCode = 100
			})
			const mockDebug = jest.fn()
			// @ts-ignore
			getLogger.mockImplementation(() => {
				return {
					debug: mockDebug,
				}
			})


			// @ts-ignore
			logging(req, res, next)


			expect(mockDebug).toHaveBeenCalled()
			expect(mockDebug).toHaveBeenCalledTimes(1)
			expect(mockDebug.mock?.calls[0][0]).toBe("GET / 100")
			expect(next).toHaveBeenCalled()
			// @ts-ignore
			expect(getLogger.mock?.calls?.[0]?.[0]).toBe("app")
			expect(getLogger).toHaveBeenCalled()
			expect(getLogger).toHaveBeenCalledTimes(1)
		})
	})
})