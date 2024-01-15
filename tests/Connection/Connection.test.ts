import Connection from "../../src/Connection/Connection";


describe("connection", () => {

	describe("remoteAddress", () => {
		const ip: string = "123.123.123.132"
		it("over x-forwarded-for string", () => {

			// @ts-ignore
			const client: Connection = new Connection(
				{ headers: { "x-forwarded-for" :  ip} },
			)


			expect(client.remoteAddress).toBe(ip)
			expect(typeof client.remoteAddress).toBe("string")
		})

		it("over x-forwarded-for array", () => {

			// @ts-ignore
			const client: Connection = new Connection(
				{ headers: { "x-forwarded-for" :  [ip]} },
			)


			expect(client.remoteAddress).toBe(ip)
			expect(typeof client.remoteAddress).toBe("string")
		})

		it("over socket.remoteAddress", () => {

			// @ts-ignore
			const client: Connection = new Connection(
				{
					headers: {},
					socket: { remoteAddress: ip }
				},
			)


			expect(client.remoteAddress).toBe(ip)
			expect(typeof client.remoteAddress).toBe("string")
		})


		it("x-forwarded-for frist", () => {

			const remoteAddress: string = "2.2.2.2"

			// @ts-ignore
			const client: Connection = new Connection(
				{
					headers: { "x-forwarded-for" :  [ip]} ,
					socket: { remoteAddress }
				},
			)


			expect(client.remoteAddress).toBe(ip)
			expect(client.remoteAddress).not.toBe(remoteAddress)
			expect(typeof client.remoteAddress).toBe("string")
		})


		it("x-forwarded-for frist", () => {

			const remoteAddress: string = "2.2.2.2"

			// @ts-ignore
			const client: Connection = new Connection(
				{
					headers: {} ,
					socket: {}
				},
			)
			expect(() => client.remoteAddress).toThrow(new Error("no remoteAddress can be found"))
		})
	})

	describe("send", () => {
		it("should be send data without callback or options", () => {

			const mockSend: jest.Mock = jest.fn()
			// @ts-ignore
			const client: Connection = new Connection(
				// @ts-ignore
				{},
				{},
				{},
				{
					send: mockSend
				},
				{},
				{},
				{}
			)
			const data: Buffer = Buffer.from("test")

			client.send(data)

			expect(mockSend).toHaveBeenCalledTimes(1)
			expect(mockSend).toHaveBeenCalledWith(data, {}, undefined)
		})

		it("should be send data with callback", () => {
			const mockSend: jest.Mock = jest.fn()
			const callback: jest.Mock = jest.fn()
			// @ts-ignore
			const client: Connection = new Connection(
				// @ts-ignore
				{},
				{},
				{},
				{
					send: mockSend
				},
				{},
				{},
				{}
			)
			const data: Buffer = Buffer.from("test")

			client.send(data, callback)

			expect(mockSend).toHaveBeenCalledTimes(1)
			expect(mockSend).toHaveBeenCalledWith(data, {}, callback)
		})

		it("should be send data with options", () => {
			const mockSend: jest.Mock = jest.fn()
			// @ts-ignore
			const options: Options = {
				compress: true
			}
			// @ts-ignore
			const client: Connection = new Connection(
				// @ts-ignore
				{},
				{},
				{},
				{
					send: mockSend
				},
				{},
				{},
				{}
			)
			const data: Buffer = Buffer.from("test")

			client.send(data, undefined, options)

			expect(mockSend).toHaveBeenCalledTimes(1)
			expect(mockSend).toHaveBeenCalledWith(data, options, undefined)
		})
	})

	describe("close", () => {
		it("should be close without code or data", () => {

			const mockClose: jest.Mock = jest.fn()
			// @ts-ignore
			const client: Connection = new Connection(
				// @ts-ignore
				{},
				{},
				{},
				{
					close: mockClose
				},
				{},
				{},
				{}
			)

			client.close()

			expect(mockClose).toHaveBeenCalledTimes(1)
			expect(mockClose).toHaveBeenCalledWith(undefined, undefined)
		})

		it("should be close with code", () => {
			const mockClose: jest.Mock = jest.fn()
			// @ts-ignore
			const client: Connection = new Connection(
				// @ts-ignore
				{},
				{},
				{},
				{
					close: mockClose
				},
				{},
				{},
				{}
			)

			client.close(1000)

			expect(mockClose).toHaveBeenCalledTimes(1)
			expect(mockClose).toHaveBeenCalledWith(1000, undefined)
		})

		it("should be close with data", () => {
			const mockClose: jest.Mock = jest.fn()
			// @ts-ignore
			const client: Connection = new Connection(
				// @ts-ignore
				{},
				{},
				{},
				{
					close: mockClose
				},
				{},
				{},
				{}
			)

			client.close(undefined, "test")

			expect(mockClose).toHaveBeenCalledTimes(1)
			expect(mockClose).toHaveBeenCalledWith(undefined, "test")
		})

		it("should be close with code and data", () => {
			const mockClose: jest.Mock = jest.fn()
			// @ts-ignore
			const client: Connection = new Connection(
				// @ts-ignore
				{},
				{},
				{},
				{
					close: mockClose
				},
				{},
				{},
				{}
			)

			client.close(1000, "test")

			expect(mockClose).toHaveBeenCalledTimes(1)
			expect(mockClose).toHaveBeenCalledWith(1000, "test")
		})
	})

	describe("publish", () => {
		it("should be publish with string", () => {
			const mockPublish: jest.Mock = jest.fn()
			const topic: string = "test"
			// @ts-ignore
			const data: PublishData = "test"
			// @ts-ignore
			const client: Connection = new Connection(
				// @ts-ignore
				{},
				{},
				{},
				{},
				{
					publish: mockPublish
				},
				{},
				{

				}
			)

			client.publish(topic, data)

			expect(mockPublish).toHaveBeenCalledTimes(1)
			expect(mockPublish).toHaveBeenCalledWith(topic, data)
		})

		it("should be publish with callback", () => {
			const mockPublish: jest.Mock = jest.fn()
			const topic: string = "test"
			const callback: jest.Mock = jest.fn()
			// @ts-ignore
			const data: PublishData = callback
			// @ts-ignore
			const client: Connection = new Connection(
				// @ts-ignore
				{},
				{},
				{},
				{},
				{
					publish: mockPublish
				},
				{},
				{

				}
			)

			client.publish(topic, data)

			expect(mockPublish).toHaveBeenCalledTimes(1)
			expect(mockPublish).toHaveBeenCalledWith(topic, data)
		})
	})

	it("should be subscribe", () => {
		const mockSubscribe: jest.Mock = jest.fn()
		const topic: string = "test"
		// @ts-ignore
		const client: Connection = new Connection(
			// @ts-ignore
			{},
			{},
			{},
			{},
			{},
			{},
			{
				add: mockSubscribe
			}
		)

		client.subscribe(topic)

		expect(mockSubscribe).toHaveBeenCalledTimes(1)
		expect(mockSubscribe).toHaveBeenCalledWith(topic)
	})

	it("should be unsubscribe", () => {
		const mockSubscribe: jest.Mock = jest.fn()
		const topic: string = "test"
		// @ts-ignore
		const client: Connection = new Connection(
			// @ts-ignore
			{},
			{},
			{},
			{},
			{},
			{},
			{
				delete: mockSubscribe
			}
		)

		client.unsubscribe(topic)

		expect(mockSubscribe).toHaveBeenCalledTimes(1)
		expect(mockSubscribe).toHaveBeenCalledWith(topic)
	})

	it("should be hasSubscribe", () => {
		const mockSubscribe: jest.Mock = jest.fn()
		const topic: string = "test"
		// @ts-ignore
		const client: Connection = new Connection(
			// @ts-ignore
			{},
			{},
			{},
			{},
			{},
			{},
			{
				has: mockSubscribe.mockReturnValue(true)
			}
		)

		expect(client.hasSubscribe(topic)).toBe(true)
		expect(mockSubscribe).toHaveBeenCalledTimes(1)
		expect(mockSubscribe).toHaveBeenCalledWith(topic)
	})

	it("should be toString", () => {
		const ip: string = "123.123.123.132"

		const mockToString: jest.Mock = jest.fn()
		const topic: string = "test"
		// @ts-ignore
		const client: Connection = new Connection(
			// @ts-ignore
			{
				headers: {
					"x-forwarded-for" :  ip
				}
			},
			{},
			{},
			{},
			{},
			{
				toString: mockToString.mockReturnValue("test")
			},
			{}
		)
		const string: string = client.toString()

		expect(mockToString).toHaveBeenCalledTimes(1)
		expect(mockToString).toHaveBeenCalledWith()
		expect(string).toBe(`remoteAddress: ${ip} alive: test`)

	})

	it("should return url", () => {

		const url: string = "https://www.example.com:8080/test?test=1#test"

		// @ts-ignore
		const client: Connection = new Connection(
			{
				url,
				headers: {} ,
				socket: {}
			},
		)
		expect(client.url).toEqual({
			protocol: "https:",
			slashes: true,
			auth: null,
			host: "www.example.com:8080",
			port: "8080",
			hostname: "www.example.com",
			hash: "#test",
			search: "?test=1",
			query: "test=1",
			pathname: "/test",
			path: "/test?test=1",
			href: "https://www.example.com:8080/test?test=1#test"
		})
	})


})