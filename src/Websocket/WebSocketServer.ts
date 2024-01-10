import { WebSocketServer as WSS, WebSocket } from "ws"
import { WebSocketHandler } from "./WebSocketHandler"
import * as internal from "node:stream"
import { IncomingMessage } from "node:http"
import Connection from "../Connection/Connection"
import { Pubilsher, PublishData } from "../Connection/Publish"
import WebSocketServerHeartbeat from "./WebSocketServerHeartbeat"
import { getLogger, Logger } from "../Logger"

export default class WebSocketServer extends WSS implements Pubilsher {
	private heartbeat: WebSocketServerHeartbeat

	constructor(
		public webSocketHandler: WebSocketHandler,
		private logger: Logger = getLogger("WebSocketServer"),
		public connectedClients: Set<Connection> = new Set<Connection>(),
	) {
		super({ noServer: true })

		const heartbeatLogger: Logger = getLogger(`${this.logger.defaultMeta.service}Heartbeat`)

		// set heartbeat and start it
		this.heartbeat = new WebSocketServerHeartbeat(this, heartbeatLogger)
		this.heartbeat.start()

		this.on("connection", async (webSocket: WebSocket, client: Connection): Promise<void> => {
			this.connectedClients.add(client)
			this.webSocketHandler.onConnect(client)

			webSocket.on("message", this.webSocketHandler.onMessage.bind(this.webSocketHandler, client))

			webSocket.on("error", this.webSocketHandler.onError.bind(this.webSocketHandler, client))

			webSocket.on("pong", (): void => {
				heartbeatLogger.debug(`receiving a pong from client: ${client.toString()}`)
				client.isAlive = true
			})

			webSocket.on("close", (code: number, reason: Buffer) => {
				this.webSocketHandler.onClose(client, code, reason)
				this.connectedClients.delete(client)
			})
		})

	}

	/**
	 * @inheritDoc
	 * @param topic
	 * @param data
	 */
	public publish(topic: string, data: PublishData): void {
		this.logger.debug(`Publishing to topic "${topic}" with data:${(typeof data === "string") ? JSON.stringify(data) : "PublishCallback"}`)
		let client: Connection
		for (client of this.connectedClients) {
			if (client.hasSubscribe(topic)) {
				if (typeof data === "function") {
					data(client)
				} else {
					client.send(data)
				}
			}
		}
	}

	/**
	 * HTTP-Upgrade-Manager
	 * @param request
	 * @param socket
	 * @param head
	 */
	public async upgrade(request: IncomingMessage, socket: internal.Duplex, head: Buffer): Promise<void> {
		// Connection authentication for the http upgrade
		if (typeof this.webSocketHandler.onVerify === "function") {
			// if the onVerify method is async, await it
			const auth: boolean = await this.webSocketHandler.onVerify(request, socket, head)

			// if the auth is false, close the connection
			if (!auth) {
				this.logger.warn(`Unauthorized connection from ${request.socket.remoteAddress}`)
				socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n")
				socket.destroy()
				return
			}
		}

		// Upgrade the connection
		this.handleUpgrade(request, socket, head, (webSocket: WebSocket) => {
			const client: Connection = new Connection(request, socket, head, webSocket, this)
			this.emit("connection", webSocket, client)
		})
	}


}