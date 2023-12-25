import {fristElementOrVariable} from "../../src/Utils";

describe("fristElementOrVariable", () => {
    it("array if", () => {
        const numbs: number[] = [1, 2, 3]
        expect(fristElementOrVariable<number>(numbs)).toBe(numbs[0])
    })

    it("simple variable", () => {
        const numbs: number = 1
        expect(fristElementOrVariable<number>(numbs)).toBe(numbs)
    })

    it("empty array", () => {
        const numbs: number[] = []
        expect(fristElementOrVariable<number>(numbs)).toBe(undefined)
    })

    it("empty simple variable", () => {
        const numbs: undefined = undefined
        expect(fristElementOrVariable<number>(numbs)).toBe(undefined)
    })
})