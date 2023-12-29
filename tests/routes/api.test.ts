import request, { Response } from "supertest"
import api from "../../src/routes/app"
import express from "express"


describe("api", () => {
	const app = express();
	app.use(express.urlencoded({ extended: true }))
	app.use("/", api)

	it("should be / route", async () => {
		request(app)
			.get("/")
			.expect("Content-Type", "application/json; charset=utf-8")
			.expect(200)
			.then((response: Response): void => {
				expect(response.statusCode).toBe(200)
				expect(response.body).toEqual({ api: "hallo" })
			})
	})
})