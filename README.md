# WebSocket Template (TypeScript) with Logger, Dockerfile, Hooks and GitHubActions

This repository contains a simple template for the use of WebSockets in an object-oriented programming style with TypeScript. The template already contains a logger to log important events and errors. It is designed so that you can quickly start developing WebSocket applications.

## Requirements
Make sure that the following requirements are met before you start using this template:
- Node.js installed
- Access to a WebSocket-enabled environment

## Installation

1. clone the repository to your local computer:
````bash
git clone https://github.com/dein-username/websocket-template.git
````
2. change to the directory of the project:
````bash
cd websocket-template
````

3. install the dependencies:
````bash
npm install
````

## Usage

1. open the project in your favorite code editor

2. adjust the WebSocket connection data in the config.ts file if necessary
3. create new WebSocket classes or extend the existing classes in the src directory according to your requirements. Use the OOP structure to organize code clearly.

4. execute the project:
 ````bash
npm run dev
````
## Logger

The template contains a simple logger that outputs messages to the console. Use it to monitor important information and error messages during runtime. Example:

````typescript 
import getLogger from "../Logger/getLogger"
import { Logger } from "winston"

const logger: Logger = getLogger("testLogger")
logger.debug("message")
logger.info("message")
logger.notice("message")
logger.warning("message")
logger.error("message")
logger.crit("message")
logger.alert("message")
logger.emerg("message")
````
## Example of WebSocket class
````typescript 
import { WebSocketHandler } from "./Websocket/WebSocketHandler"
import Client from "./Client/Client"
import { RawData } from "ws"

export default class TestHandler implements WebSocketHandler {
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
````
index.ts
````typescript
import WebSocketServer from "./Websocket/WebSocketServer"
import { IncomingMessage } from "node:http"
import internal from "node:stream"
import express, { Express } from "express"
import * as http from "http"
import { isInteger } from "./Utils"
import { Logger } from "winston"
import getLogger from "./Logger/getLogger"

const HOST: string = process.env.HOST ?? "0.0.0.0"
const PORT: number = (isInteger(process.env.PORT)) ? parseInt(process.env.PORT ?? "9999", 10) : 9999
const logger: Logger = getLogger("main")


const wss1: WebSocketServer = new WebSocketServer(new TestHandler(), getLogger("WebSocketServer1"))
logger.info("initializing WebSocketServer1")

const app: Express = express()
logger.info("initializing express")

const server: http.Server = http.createServer(app)
logger.info("initializing server")

server.on("upgrade", (request: IncomingMessage, socket: internal.Duplex, head: Buffer): void => {
	wss1.upgrade(request, socket, head)
})
logger.info("added upgrade handler")

server.listen(PORT, HOST, (): void => {
	logger.info(`server is running on ${ HOST }:${ PORT }`)
})

````
Customize the class according to your requirements and use it in your application.

small example is in index.ts

## License
This project is licensed under the MIT license - see the LICENSE file for more details.