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

})