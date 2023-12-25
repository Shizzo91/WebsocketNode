import { fillZeros } from "../../src/Utils"

describe("fillZeros", () => {
    it("no zeros", () => {
        const value: number  = 2
        expect(fillZeros(value, 0, 0)).toBe("2")
    })
    it("one front zero", () => {
        const value: number  = 2
        expect(fillZeros(value, 2, 0)).toBe("02")
    })
    it("integer one back zero", () => {
        const value: number  = 2
        expect(fillZeros(value, 0, 1)).toBe("2.0")
    })
    it("float ohne back zero", () => {
        const value: number  = 2.1
        expect(fillZeros(value, 0, 1)).toBe("2.1")
    })

    it("float ohne back zero but float", () => {
        const value: number  = 2.1
        expect(fillZeros(value, 0, 0)).toBe("2.1")
    })
})