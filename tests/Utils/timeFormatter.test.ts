import timeFormatter from "../../src/Utils/timeFormatter";

describe("timeFormatter", () => {
    it("milliseconds", () => {
        const millis: number = 999
        expect(timeFormatter(millis)).toBe(`000d 00h 00m 00s ${millis}ms`)
    })
    it("seconds + milliseconds", () => {
        const value: number = 9 + 1000
        expect(timeFormatter(value)).toBe(`000d 00h 00m 01s 009ms`)
    })

    it("hours + minutes +seconds + milliseconds", () => {
        const value: number = 9 + 1000 + 60000
        expect(timeFormatter(value)).toBe(`000d 00h 01m 01s 009ms`)
    })

    it("hours + minutes +seconds + milliseconds", () => {
        const value: number = 9 + 1000 + 60000 + (60000 * 60)
        expect(timeFormatter(value)).toBe(`000d 01h 01m 01s 009ms`)
    })

    it("hours + minutes +seconds + milliseconds", () => {
        const value: number = 9 + 1000 + 60000 + (60000 * 60) + (60000 * 60 * 24)
        expect(timeFormatter(value)).toBe(`001d 01h 01m 01s 009ms`)
    })
})