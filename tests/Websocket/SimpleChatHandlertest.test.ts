import SimpleChatHandler from "../../src/Websocket/SimpleChatHandler"

describe("ExampleHandler", () => {
	const url = { search: "name=Peter"}
	describe("onConnect", () => {
		const handler = new SimpleChatHandler()
		it("should connect to handler", async () => {
				const send = jest.fn((msg) => void 0)
				const subscribe = jest.fn((msg) => void 0)
				const publish = jest.fn((msg) => void 0)
				 // @ts-ignore
				await handler.onConnect({ send, url, subscribe, publish })
				expect(send).toHaveBeenCalledWith("hallo Peter")
				expect(subscribe).toHaveBeenCalledWith("all")
				expect(publish).toHaveBeenCalledWith("all", "connect Peter")
				expect(publish).toHaveBeenCalledTimes(1)

		})
	})

	describe("onMessage", () => {
		const handler = new SimpleChatHandler()
		it("should connect to handler", async () => {
				const send = jest.fn((msg) => void 0)
				// const subscribe = jest.fn((msg) => void 0)
				const publish = jest.fn((msg) => void 0)
				const data = Buffer.from("hallo")



				 // @ts-ignore
				await handler.onMessage({ send, publish, url }, data)


				expect(send).not.toHaveBeenCalled()
				expect(publish).toHaveBeenCalledWith("all", "Peter: hallo")
				expect(publish).toHaveBeenCalledTimes(1)
		})
	})

	describe("onClose", () => {
		const handler = new SimpleChatHandler()
		it("should be disconnected", async () => {
			const publish = jest.fn((msg) => void 0)

			// @ts-ignore
			handler.onClose({ publish, url })

			expect(publish).toHaveBeenCalledWith("all", "disconnect Peter")
			expect(publish).toHaveBeenCalledTimes(1)
		})
	})

	describe("onError", () => {
		const handler = new SimpleChatHandler()
		it("should be error", async () => {
			const publish = jest.fn((msg) => void 0)
			const err = new Error("test")

			// @ts-ignore
			handler.onError({ publish, url }, err)

			expect(publish).toHaveBeenCalledWith("all", "error Peter Error: test")
			expect(publish).toHaveBeenCalledTimes(1)
		})
	})

	describe("onVerify", () => {
		const handler = new SimpleChatHandler()

		it("should be verified", async () => {

			const request = { url: "http://localhost:8080?name=Peter" }

			// @ts-ignore
			const result = handler.onVerify(request)

			expect(result).toBeTruthy()
		})

		it("should not be verified", async () => {

			const request = { url: "http://localhost:8080" }

			// @ts-ignore
			const result = handler.onVerify(request)

			expect(result).toBeFalsy()
		})
	})

	describe("send to all", () => {
		it("should be send to all", async () => {
			const handler = new SimpleChatHandler()
			const mockSend = jest.fn((msg) => void 0)
			const connectionList = new Set()
			connectionList.add({ send: mockSend })

			// @ts-ignore
			handler.parent = { connectedClients: connectionList }

			const data = Buffer.from("hallo")

			// @ts-ignore
			const result = handler.sendToAll(data)

			expect(result).toBeTruthy()
			expect(mockSend).toHaveBeenCalledWith(data)
			expect(mockSend).toHaveBeenCalledTimes(1)
		})

		it("should not be send to all of try and catch", async () => {
			const handler = new SimpleChatHandler()
			const mockSend = jest.fn((msg) => void 0)
				.mockImplementation((msg) => {
					throw new Error("test")
				})
			const connectionList = new Set()
			connectionList.add({ send: mockSend })

			// @ts-ignore
			handler.parent = { connectedClients: connectionList }

			const data = Buffer.from("hallo")

			// @ts-ignore
			const result = handler.sendToAll(data)

			expect(result).toBeFalsy()
		})

		it("should not be send to all", async () => {
			const handler = new SimpleChatHandler()

			const data = Buffer.from("hallo")

			// @ts-ignore
			const result = handler.sendToAll(data)

			expect(result).toBeFalsy()
		})
	})
})