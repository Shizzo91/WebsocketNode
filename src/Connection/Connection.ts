import { IncomingMessage } from "http"
import { WebSocket } from "ws"
import WebSocketServer from "../Websocket/WebSocketServer"
import internal from "node:stream"
import BufferLike from "./BufferLike"
import { PublishData, PubSubscriber } from "./Publish"
import Options from "./Options"
import ErrorCallback from "./ErrorCallback"
import { fristElementOrVariable } from "../Utils"
import ConnectionTimer from "./ConnectionTimer"
import * as url from "url"

export default class Connection implements PubSubscriber {

	/**
	 * if the connection is alive
	 */
	public isAlive: boolean = true
	constructor(
		public readonly request: IncomingMessage,
		public readonly socket: internal.Duplex,
        public readonly head: Buffer,
        public readonly webSocket: WebSocket,
        public readonly webSocketServer: WebSocketServer,
        public readonly createAt: ConnectionTimer = new ConnectionTimer(),
        private subscibtions: Set<string> = new Set<string>,
	) {}

	/**
	 * returns the remote address of the client
	 * @see https://nodejs.org/api/net.html#net_socket_remoteaddress
	 */
	public get remoteAddress(): string {
		const xForwardedForIp: string | undefined = fristElementOrVariable<string>(this.request.headers["x-forwarded-for"])

		if (typeof xForwardedForIp === "string"
			&& xForwardedForIp.length > 0) {
			return xForwardedForIp
		}

		const remoteAddress: string | undefined = this.request.socket.remoteAddress
		if (typeof remoteAddress === "string"
			&& remoteAddress.length > 0)
		{
			return remoteAddress
		}

		throw new Error("no remoteAddress can be found")
	}

	/**
	 * returns the url of the request as a url object
	 * @see https://nodejs.org/api/url.html#url_class_url
	 */
	public get url(): url.UrlWithStringQuery {
		return url.parse(this.request.url ?? "")
	}

	/**
	 * Sends a message to the client
	 * @param data
	 * @param cb
	 * @param options
	 */
	public send(data: BufferLike, cb?: ErrorCallback, options?: Options): void {
		this.webSocket.send(data, options ?? {}, cb)
	}

	/**
	 * Closes the connection to the client
	 * @param code
	 * @param data
	 */
	public close(code?: number, data?: string | Buffer): void {
		this.webSocket.close(code, data)
	}

	/**
	 * Sends a message to all subscribers if it is a string, but if it is a callback, each subscriber is called with this callback.
	 * @param topic
	 * @param data
	 */
	public publish(topic: string, data: PublishData): void {
		this.webSocketServer.publish(topic, data)
	}

	/**
	 * @inheritDoc
	 * @param topic
	 */
	public subscribe(topic: string): void {
		this.subscibtions.add(topic)
	}

	/**
	 * @inheritDoc
	 * @param topic
	 */
	public unsubscribe(topic: string): void {
		this.subscibtions.delete(topic)
	}

	/**
	 * @inheritDoc
	 * @param topic
	 */
	public hasSubscribe(topic: string): boolean {
		return this.subscibtions.has(topic)
	}

	/**
	 * @inheritDoc
	 */
	public toString(): string {
		return `remoteAddress: ${this.remoteAddress} alive: ${this.createAt.toString()}`
	}
}