import { WebSocketHandler } from "./Websocket/WebSocketHandler"
import Client from "./Client/Client"
import {RawData } from "ws"
import WebSocketServer from "./Websocket/WebSocketServer"
import { IncomingMessage } from "node:http"
import internal from "node:stream"
import express, { Express } from 'express'
import * as http from "http"
import { isInteger } from "./Utils"
import {Logger} from "winston";
import getLogger from "./Logger/getLogger";


const HOST: string = process.env.HOST ?? "0.0.0.0"
const PORT: number = (isInteger(process.env.PORT)) ? parseInt(process.env.PORT ?? "9999", 10) : 9999
const logger: Logger = getLogger("main")

class TestHandler implements WebSocketHandler {
    public async onClose(client: Client, code: number, reason: Buffer): Promise<void> {
        console.log({client, code, reason})

        return undefined;
    }

    public async onConnect(client: Client): Promise<void> {
        console.log({client})
        client.send("hallo")
        return undefined;
    }

    public async onError(client: Client, err: Error): Promise<void> {
        console.log({client, err})
        return undefined;
    }

    public async onMessage(client: Client, data: RawData, isBinary: boolean): Promise<void> {
        console.log({client, data, isBinary})
        return undefined;
    }

}

const wss1: WebSocketServer = new WebSocketServer(new TestHandler(), getLogger("WebSocketServer1"))
logger.info("initializing WebSocketServer1")

const app: Express = express()
logger.info("initializing express")

const server: http.Server = http.createServer(app)
logger.info("initializing server")

server.on("upgrade", (request: IncomingMessage, socket: internal.Duplex, head: Buffer): void => {
    wss1.upgrade(request, socket, head)
})
logger.info("added upgrade handler")

server.listen(PORT, HOST, (): void => {
    logger.info(`server is running on ${HOST}:${PORT}`)
})
