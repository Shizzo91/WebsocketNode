import { getInteger, getNumber, getString, getBoolean } from "../../src/Utils/Environment"


describe("Environment", () => {
	afterEach(() => {
		delete process.env.NODE_TEST_STRING
		delete process.env.NODE_TEST_NUMBER
		delete process.env.NODE_TEST_INT
		delete process.env.NODE_TEST_BOOLEAN
		delete process.env.NODE_TEST_INT_2

		jest.clearAllMocks()
	})

	describe("getString", () => {
		it("should throw error", () => {
			expect(() => getString("NODE_TEST_STRING")).toThrowError()
		})

		it("should be default", () => {
			const string = getString("NODE_TEST_STRING", "default")

			expect(string).toBe("default")
		})

		it("should be test", () => {
			process.env.NODE_TEST_STRING = "test"

			const string = getString("NODE_TEST_STRING")

			expect(string).toBe("test")
		})
	})

	describe("getNumber", () => {
		it("should throw error", () => {
			expect(() => getNumber("NODE_TEST_NUMBER")).toThrowError()
		})

		it("should be default", () => {
			const number = getNumber("NODE_TEST_NUMBER", 2)

			expect(number).toBe(2)
		})

		it("should be number", () => {
			process.env.NODE_TEST_NUMBER = "1"

			const number = getNumber("NODE_TEST_NUMBER")

			expect(number).toBe(1)
		})

		it("should throw error", () => {
			process.env.NODE_TEST_NUMBER = "test"

			expect(() => getNumber("NODE_TEST_NUMBER")).toThrowError()
		})

		it("should be number",  () => {
			process.env.NODE_TEST_NUMBER = "1"

			const number = getNumber("NODE_TEST_NUMBER")

			expect(number).toBe(1)
		})

	})

	describe("getInteger", () => {
		it("should throw error no integer", () => {
			process.env.NODE_TEST_INT_2 = "2.2"
			expect(() => getInteger("NODE_TEST_INT_2", 1.1)).toThrowError(new Error(`environment variable "NODE_TEST_INT_2" is not a integer`))
		})

		it("should be default", () => {
			const number = getInteger("NODE_TEST_INT", 2)

			expect(number).toBe(2)
		})

		it("should throw error", () => {
			process.env.NODE_TEST_INT = "test"

			expect(() => getInteger("NODE_TEST_INT", 1)).toThrowError(new Error(`environment variable "NODE_TEST_INT" is not a number`))
		})

		it("should be integer",  () => {
			process.env.NODE_TEST_INT = "1"

			const number = getInteger("NODE_TEST_INT", 2)

			expect(number).toBe(1)
		})

		it("should be integer by default",  () => {
			process.env.NODE_TEST_INT = "1"

			const number = getInteger("NODE_TEST_INT_1", 2)

			expect(number).toBe(2)
		})
	})

	describe("getBoolean", () => {
		it("should be default", () => {
			const number = getBoolean("NODE_TEST_BOOLEAN", false)

			expect(number).toBe(false)
		})

		it("should be boolean by text",  () => {
			process.env.NODE_TEST_BOOLEAN = "test"

			const number = getBoolean("NODE_TEST_BOOLEAN", false)

			expect(number).toBe(false)
		})

		it("should be boolean by true",  () => {
			process.env.NODE_TEST_BOOLEAN = "true"

			const number = getBoolean("NODE_TEST_BOOLEAN", false)

			expect(number).toBe(true)

		})

		it("should be boolean by 1",  () => {
			process.env.NODE_TEST_BOOLEAN = "1"

			const number = getBoolean("NODE_TEST_BOOLEAN", false)

			expect(number).toBe(true)
		})
	})




})