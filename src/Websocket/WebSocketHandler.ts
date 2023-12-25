import Client from "../Client/Client"
import { RawData } from "ws"

export type WebSocketHandler = {
    /**
     * Handling the initial connection
     * @param client
     */
    onConnect(client: Client): void | Promise<void>,

    /**
     * Handling of the message event
     * @param client
     * @param data
     * @param isBinary
     */
    onMessage(client: Client, data: RawData, isBinary: boolean): void | Promise<void>,

    /**
     * Handling of the closing event
     * @param client
     * @param code
     * @param reason
     */
    onClose(client: Client, code: number, reason: Buffer): void | Promise<void>,

    /**
     * Handling of the error event
     * @param client
     * @param err
     */
    onError(client: Client, err: Error): void | Promise<void>
}