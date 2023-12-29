import request, { Response } from "supertest"
import app from "../../src/routes/app"

describe("app", () => {
	it("should be / route", async () => {
		return request(app)
			.get("/")
			.expect("Content-Type", "application/json; charset=utf-8")
			.expect(200)
			.then((response: Response): void => {
				expect(response.statusCode).toBe(200)
				expect(response.body).toEqual({ hi: "test" })
			})
	})
})