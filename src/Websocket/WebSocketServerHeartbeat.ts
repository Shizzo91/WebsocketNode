import WebSocketServer from "./WebSocketServer"
import Client from "../Client/Client"
import {Logger} from "winston"

export default class WebSocketServerHeartbeat {
	private timer: NodeJS.Timeout | undefined

	constructor(
		private webSocketServer: WebSocketServer,
		private logger: Logger,
		private beatTime: number = 15_000
	) {}

	public start(): void {
		this.logger.info("Starting")
		this.timer = setInterval(() => {
			this.logger.info(`sending a alive notification to ${this.webSocketServer.connectedClients.size} clients`)
			this.webSocketServer.connectedClients.forEach((client: Client): void => {
				if (!client.isAlive) {
					this.logger.info(`client is not alive and will be terminated client: ${client.toString()}`)
					client.webSocket.terminate()
				}
				client.isAlive = false
				client.webSocket.ping()
				this.logger.info(`sending ping to client: ${client.toString()}`)
			})
		}, this.beatTime)
	}

	public stop() : void {
		clearTimeout(this.timer)
	}

	public restart(): void {
		this.stop()
		this.start()
	}

}