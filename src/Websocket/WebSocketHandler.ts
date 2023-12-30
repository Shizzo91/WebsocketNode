import Connection from "../Connection/Connection"
import { RawData } from "ws"
import { IncomingMessage } from "node:http"
import internal from "node:stream"

export type WebSocketHandler = {
    /**
     * The verification method for this websocket connection default will be true on any websocket connection
     * @param request
     * @param socket
     * @param head
     */
    onVerify?(request: IncomingMessage, socket: internal.Duplex, head: Buffer): boolean

    /**
     * Handling the initial connection
     * @param connection
     */
    onConnect(connection: Connection): void | Promise<void>,

    /**
     * Handling of the message event
     * @param connection
     * @param data
     * @param isBinary
     */
    onMessage(connection: Connection, data: RawData, isBinary: boolean): void | Promise<void>,

    /**
     * Handling of the closing event
     * @param connection
     * @param code
     * @param reason
     */
    onClose(connection: Connection, code: number, reason: Buffer): void | Promise<void>,

    /**
     * Handling of the error event
     * @param connection
     * @param err
     */
    onError(connection: Connection, err: Error): void | Promise<void>
}

export default WebSocketHandler