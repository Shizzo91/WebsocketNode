import { WebSocketHandler } from "./WebSocketHandler"
import Connection from "../Connection/Connection"
import { RawData } from "ws"
import { IncomingMessage } from "node:http"
import * as url from "url"

export default class SimpleChatHandler implements WebSocketHandler {
	public onVerify(request: IncomingMessage): boolean {
		const urlObject: url.UrlWithStringQuery = url.parse(request.url ?? "")
		const urlSearchParams: URLSearchParams = new URLSearchParams(urlObject.search?.toString())
		const name: string | null = urlSearchParams.get("name")
		return !!name
	}

	private getName(connection: Connection): string | null {
		const urlSearchParams: URLSearchParams = new URLSearchParams(connection.url.search?.toString())
		return urlSearchParams.get("name")
	}

	public async onClose(connection: Connection): Promise<void> {

		connection.publish("all", `disconnect ${this.getName(connection)}`)
		return undefined
	}

	public async onConnect(connection: Connection): Promise<void> {
		connection.send(`hallo ${this.getName(connection)}`)
		connection.subscribe("all")
		connection.publish("all", `connect ${this.getName(connection)}`)
		return undefined
	}

	public async onError(connection: Connection, err: Error): Promise<void> {
		connection.publish("all", `error ${this.getName(connection)} ${err}`)
		return undefined
	}

	public async onMessage(connection: Connection, data: RawData): Promise<void> {
		connection.publish("all", `${this.getName(connection)}: ${data.toString()}`)
		return undefined
	}

}