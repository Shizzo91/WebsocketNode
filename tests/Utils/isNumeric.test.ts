import { isNumeric } from "../../src/Utils"

describe("isNumeric", () => {
    it("array", () => {
        const numbs: number[] = [1, 2, 3]
        expect(isNumeric(numbs)).toBeFalsy()
    })

    it("integer", () => {
        const numbs: number = 1
        expect(isNumeric(numbs)).toBeTruthy()
    })

    it("integer as string", () => {
        const numbs: string = "1"
        expect(isNumeric(numbs)).toBeTruthy()
    })

    it("float", () => {
        const numbs: number = 1.1
        expect(isNumeric(numbs)).toBeTruthy()
    })

    it("float as string", () => {
        const numbs: string = "1.1"
        expect(isNumeric(numbs)).toBeTruthy()
    })

    it("empty array", () => {
        const numbs: number[] = []
        expect(isNumeric(numbs)).toBeFalsy()
    })

    it("undefined", () => {
        const numbs: undefined = undefined
        expect(isNumeric(numbs)).toBeFalsy()
    })

    it("object", () => {
        const numbs: object = {}
        expect(isNumeric(numbs)).toBeFalsy()
    })
})