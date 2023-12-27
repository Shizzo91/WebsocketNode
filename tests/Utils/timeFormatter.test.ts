import timeFormatter from "../../src/Utils/timeFormatter";

describe("timeFormatter", () => {
    describe("default format", () => {
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
    describe("defined format", () => {
        const options = { shorthand: false, fill: " " }
        it("milliseconds", () => {
            const millis: number = 999
            expect(timeFormatter(millis, options)).toBe(`000 days 00 hours 00 minutes 00 seconds ${millis} milliseconds`)
        })
        it("seconds + milliseconds", () => {
            const value: number = 9 + 1000
            expect(timeFormatter(value, options)).toBe(`000 days 00 hours 00 minutes 01 seconds 009 milliseconds`)
        })

        it("hours + minutes +seconds + milliseconds", () => {
            const value: number = 9 + 1000 + 60000
            expect(timeFormatter(value, options)).toBe(`000 days 00 hours 01 minutes 01 seconds 009 milliseconds`)
        })

        it("hours + minutes +seconds + milliseconds", () => {
            const value: number = 9 + 1000 + 60000 + (60000 * 60)
            expect(timeFormatter(value, options)).toBe(`000 days 01 hours 01 minutes 01 seconds 009 milliseconds`)
        })

        it("hours + minutes +seconds + milliseconds", () => {
            const value: number = 9 + 1000 + 60000 + (60000 * 60) + (60000 * 60 * 24)
            expect(timeFormatter(value, options)).toBe(`001 days 01 hours 01 minutes 01 seconds 009 milliseconds`)
        })
    })
    describe("defined format and removing heading zeros", () => {
        const options = { shorthand: false, fill: " ", removeHeadingZeros: true }
        it("milliseconds", () => {
            const millis: number = 999
            expect(timeFormatter(millis, options)).toBe(`${millis} milliseconds`)
        })
        it("seconds + milliseconds", () => {
            const value: number = 9 + 1000
            expect(timeFormatter(value, options)).toBe(`01 seconds 009 milliseconds`)
        })

        it("hours + minutes +seconds + milliseconds", () => {
            const value: number = 9 + 1000 + 60000
            expect(timeFormatter(value, options)).toBe(`01 minutes 01 seconds 009 milliseconds`)
        })

        it("hours + minutes +seconds + milliseconds", () => {
            const value: number = 9 + 1000 + 60000 + (60000 * 60)
            expect(timeFormatter(value, options)).toBe(`01 hours 01 minutes 01 seconds 009 milliseconds`)
        })

        it("hours + minutes +seconds + milliseconds", () => {
            const value: number = 0 + 1000 + 60000 + (60000 * 60) + (60000 * 60 * 24)
            expect(timeFormatter(value, options)).toBe(`001 days 01 hours 01 minutes 01 seconds 000 milliseconds`)
        })
    })

})