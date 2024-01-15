import { getLogger, Logger } from "../../src/Logger"
import { screamCase } from "../../src/Utils"
describe("getLogger", () => {


	it("should be return logger", () => {
		const logger: Logger = getLogger("test")
		expect(logger).toBeInstanceOf(Logger)
		expect(logger.defaultMeta?.service).toBe(screamCase("test"))
		expect(logger).toHaveProperty("debug")
		expect(logger).toHaveProperty("info")
		expect(logger).toHaveProperty("error")
	})

	it("should be return logger not twice", () => {
		const logger: Logger = getLogger("testTwo")
		const logger2: Logger = getLogger("testTwo")

		expect(logger).toBeInstanceOf(Logger)
		expect(logger2).toBeInstanceOf(Logger)
		expect(logger).toBe(logger2)
	})

	it("should be return logger twice", () => {
		const logger: Logger = getLogger("testTree")
		const logger2: Logger = getLogger("testFour")

		expect(logger).toBeInstanceOf(Logger)
		expect(logger2).toBeInstanceOf(Logger)
		expect(logger.defaultMeta?.service).not.toBe(logger2.defaultMeta?.service)
	})

})
