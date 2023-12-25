import { WebSocketServer as WSS, WebSocket } from 'ws'
import { WebSocketHandler } from "./WebSocketHandler"
import * as internal from "node:stream"
import { IncomingMessage } from "node:http"
import Client from "../Client/Client"
import {Pubilsher, PublishData} from "../Client/Publish"
import WebSocketServerHeartbeat from "./WebSocketServerHeartbeat"
import getLogger from "../Logger/getLogger"
import {Logger} from "winston"

export default class WebSocketServer extends WSS implements Pubilsher {
    private heartbeat: WebSocketServerHeartbeat;

    constructor(
        public webSocketHandler: WebSocketHandler,
        private logger: Logger = getLogger("WebSocketServer"),
        public connectedClients: Set<Client> = new Set<Client>(),
    ) {
        super({ noServer: true })

        const heartbeatLogger: Logger = getLogger(`${this.logger.defaultMeta.service}Heartbeat`)

        // set heartbeat and start it
        this.heartbeat = new WebSocketServerHeartbeat(this, heartbeatLogger)
        this.heartbeat.start()

        this.on("connection", async (webSocket: WebSocket, client: Client): Promise<void> => {
            this.connectedClients.add(client)
            this.webSocketHandler.onConnect(client)

            webSocket.on("message", this.webSocketHandler.onMessage.bind(this.webSocketHandler, client))

            webSocket.on("error", this.webSocketHandler.onError.bind(this.webSocketHandler, client))

            webSocket.on("pong", (): void => {
                heartbeatLogger.info(`receiving a pong from client: ${client.toString()}`)
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
        this.logger.info(`Publishing to topic "${topic}" with data:${(typeof data === "string") ? JSON.stringify(data) : "PublishCallback"}`)
        let client: Client
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
    public upgrade(request: IncomingMessage, socket: internal.Duplex, head: Buffer): void {
        this.handleUpgrade(request, socket, head, (webSocket: WebSocket) => {
            const client: Client = new Client(request, socket, head, webSocket, this)
            this.emit("connection", webSocket, client)
        })
    }


}