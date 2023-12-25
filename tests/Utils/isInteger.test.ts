import { isInteger } from "../../src/Utils"

describe("isInteger", () => {
    it("integer string", () => {
        const value = "1"
        expect(isInteger(value)).toBeTruthy()
    })
    it("integer", () => {
        const value = 1
        expect(isInteger(value)).toBeTruthy()
    })

    it("float string", () => {
        const value = "1.1"
        expect(isInteger(value)).toBeFalsy()
    })
    it("integer", () => {
        const value = 1.1
        expect(isInteger(value)).toBeFalsy()
    })
})