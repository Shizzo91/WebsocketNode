import { authorizedRequest, unauthorizedRequest, Response } from "../__helpers__/helper"
import { jwt, logging } from "../../src/middleware"
import simpleChatHandler from "../../src/simpleChatHandler"

jest.mock("../../src/simpleChatHandler")
jest.mock("../../src/middleware")
describe("api", () => {

	beforeEach(() => {
		jest.resetModules()
		jest.resetAllMocks()
	})

	it("should be / route with auth", async () => {
		// @ts-ignore
		logging.mockImplementation((req, res, next) => {
			next()
		})
		const response: Response = await authorizedRequest.get("/api")

		expect(response.header["content-type"]).toBe("application/json; charset=utf-8")
		expect(response.statusCode).toBe(200)
		expect(response.body).toEqual({ api: "hallo" })
		expect(logging).toHaveBeenCalled()
	})

	it("should be / route", async () => {
		// @ts-ignore
		logging.mockImplementation((req, res, next) => {
			next()
		})
		const response: Response = await unauthorizedRequest.get("/api")

		expect(response.header["content-type"]).toBe("application/json; charset=utf-8")
		expect(response.statusCode).toBe(200)
		expect(response.body).toEqual({ api: "hallo" })
		expect(logging).toHaveBeenCalled()
	})

	it("should be /protection route with auth", async () => {
		// @ts-ignore
		logging.mockImplementation((req, res, next) => {
			next()
		})
		const response: Response = await authorizedRequest.get("/api/protection")

		expect(response.header["content-type"]).toBe("application/json; charset=utf-8")
		expect(response.statusCode).toBe(200)
		expect(response.body).toEqual({ exp: expect.any(Number), iat: expect.any(Number) })
		expect(logging).toHaveBeenCalled()
	})

	it("should be /protection route", async () => {
		// @ts-ignore
		logging.mockImplementation((req, res, next) => {
			next()
		})
		const response: Response = await unauthorizedRequest.get("/api/protection")

		expect(response.header["content-type"]).toBe("application/json; charset=utf-8")
		expect(response.statusCode).toBe(401)
		expect(response.body).toEqual({ error: "error" })
		expect(logging).toHaveBeenCalled()
	})

	it("should be /chat route with auth", async () => {
		// @ts-ignore
		logging.mockImplementation((req, res, next) => {
			next()
		})
		// @ts-ignore
		simpleChatHandler.sendToAll.mockReturnValue(true)

		const response: Response = await authorizedRequest.get("/api/chat")

		expect(response.header["content-type"]).toBe("application/json; charset=utf-8")
		expect(response.statusCode).toBe(200)
		expect(response.body).toEqual({ message: "data has been sendet" })
		expect(logging).toHaveBeenCalled()
		expect(simpleChatHandler.sendToAll).toHaveBeenCalled()
		expect(simpleChatHandler.sendToAll).toHaveBeenCalledTimes(1)
		expect(simpleChatHandler.sendToAll).toHaveBeenCalledWith("hallo")
	})

	it("should be /chat route with auth negative", async () => {
		// @ts-ignore
		logging.mockImplementation((req, res, next) => {
			next()
		})
		// @ts-ignore
		simpleChatHandler.sendToAll.mockReturnValue(false)

		const response: Response = await authorizedRequest.get("/api/chat")

		expect(response.header["content-type"]).toBe("application/json; charset=utf-8")
		expect(response.statusCode).toBe(200)
		expect(response.body).toEqual({ message: "data has not been sendet" })
		expect(logging).toHaveBeenCalled()
		expect(simpleChatHandler.sendToAll).toHaveBeenCalled()
		expect(simpleChatHandler.sendToAll).toHaveBeenCalledTimes(1)
		expect(simpleChatHandler.sendToAll).toHaveBeenCalledWith("hallo")
	})
})