import { WebSocketHandler } from "./WebSocketHandler"
import Client from "../Client/Client"
import { RawData } from "ws"

export default class ExampleHandler implements WebSocketHandler {
	// public onVerify(request: IncomingMessage, socket: internal.Duplex, head: Buffer): boolean {
	// 	return false
	// }
	public async onClose(client: Client, code: number, reason: Buffer): Promise<void> {
		console.log({ client, code, reason })
		return undefined
	}

	public async onConnect(client: Client): Promise<void> {
		console.log({ client })
		client.send("hallo")
		return undefined
	}

	public async onError(client: Client, err: Error): Promise<void> {
		console.log({ client, err })
		return undefined
	}

	public async onMessage(client: Client, data: RawData, isBinary: boolean): Promise<void> {
		console.log({ client, data, isBinary })
		return undefined
	}

}