import WebSocketServer from "./Websocket/WebSocketServer"
import { IncomingMessage } from "node:http"
import internal from "node:stream"
import { Logger } from "winston"
import getLogger from "./Logger/getLogger"
import { HOST, PORT } from "./settings"
import server from "./routes"
import ExampleHandler from "./Websocket/ExampleHandler"

const logger: Logger = getLogger("main")

const exampleHandler: ExampleHandler = new ExampleHandler()

const wss1: WebSocketServer = new WebSocketServer(exampleHandler, getLogger("WebSocketServer1"))
logger.info("initializing WebSocketServer1")

server.on("upgrade", (request: IncomingMessage, socket: internal.Duplex, head: Buffer): void => {
	wss1.upgrade(request, socket, head)
})
logger.info("added upgrade handler")

server.listen(PORT, HOST, (): void => {
	logger.info(`server is running on ${ HOST }:${ PORT }`)
})
