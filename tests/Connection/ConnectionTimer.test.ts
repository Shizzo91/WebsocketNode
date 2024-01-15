import ConnectionTimer from "../../src/Connection/ConnectionTimer";

describe("ConnectionTimer", () => {

	it("should be return ConnectionTimer", () => {
		const connectionTimer: ConnectionTimer = new ConnectionTimer()
		expect(connectionTimer).toBeInstanceOf(ConnectionTimer)
	})

	it("should be getTimeRemaining", () => {
		const connectionTimer: ConnectionTimer = new ConnectionTimer()
		expect(connectionTimer.getTimeRemaining()).toBeGreaterThanOrEqual(0)
	})

	it("should be toString", () => {
		const connectionTimer: ConnectionTimer = new ConnectionTimer()
		expect(connectionTimer.toString()).toBe("000d 00h 00m 00s 000ms")
	})
})