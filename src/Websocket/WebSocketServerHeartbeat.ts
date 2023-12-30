import WebSocketServer from "./WebSocketServer"
import Connection from "../Connection/Connection"
import { Logger } from "winston"

export default class WebSocketServerHeartbeat {
	private timer: NodeJS.Timeout | undefined

	constructor(
		private webSocketServer: WebSocketServer,
		private logger: Logger,
		private beatTime: number = 15_000
	) {
	}

	public start(): void {
		this.logger.debug("Starting")
		this.timer = setInterval((): void => {
			this.logger.debug(`sending a alive notification to ${ this.webSocketServer.connectedClients.size } clients`)
			this.webSocketServer.connectedClients.forEach((client: Connection): void => {
				if (!client.isAlive) {
					this.logger.warn(`client is not alive and will be terminated client: ${ client.toString() }`)
					client.webSocket.terminate()
				}
				client.isAlive = false
				client.webSocket.ping()
				this.logger.debug(`sending ping to client: ${ client.toString() }`)
			})
		}, this.beatTime)
	}

	public stop(): void {
		clearTimeout(this.timer)
	}

	public restart(): void {
		this.stop()
		this.start()
	}

}