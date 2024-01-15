import { WebSocketServer } from "./Websocket"
import { IncomingMessage } from "node:http"
import { Logger, getLogger } from "./Logger/"
import { HOST, PORT } from "./settings"
import internal from "node:stream"
import server from "./routes"
import simpleChatHandler from "./simpleChatHandler"

const logger: Logger = getLogger("main")

const wss1: WebSocketServer = new WebSocketServer(simpleChatHandler, getLogger("WebSocketServer1"))
logger.debug("initializing WebSocketServer1")

server.on("upgrade", async (request: IncomingMessage, socket: internal.Duplex, head: Buffer): Promise<void> => {
	wss1.upgrade(request, socket, head)
})
logger.debug("added upgrade handler")

server.listen(PORT, HOST, (): void => {
	logger.info(`server is running on ${ HOST }:${ PORT }`)
})
