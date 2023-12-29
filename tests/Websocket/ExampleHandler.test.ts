import ExampleHandler from "../../src/Websocket/ExampleHandler"

describe("ExampleHandler", () => {
	describe("onConnect", () => {
		const handler = new ExampleHandler()
		it("should connect to handler", async () => {
				const send = jest.fn((msg) => void 0)

				 // @ts-ignore
				await handler.onConnect({ send })
				expect(send.mock.calls.length).toBe(1)
				expect(send.mock.calls[0][0]).toBe("hallo")
		})
	})
})