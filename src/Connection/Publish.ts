import Connection from "./Connection"

type PublishCallback = (client: Connection) => void

type PublishData = string | PublishCallback

type Pubilsher = {
	/**
	 * Handling of a incoming publish event
	 * @param topic - the topic of the publish event
	 * @param data - the data of the publish event it can be a string or a callback
	 * @example
	 * connection.publish("all", "hello world")	// publish "hello world" to the topic "all"
	 * connection.publish("all", (client: Client) => client.send("hello world"))	// publish "hello world" to the topic "all"
	 */
	publish(topic: string, data: PublishData): void
}

type PubSubscriber = Pubilsher & {
	/**
	 * Handling of subscribe a topic
	 * @param topic - the topic to subscribe
	 * @example
	 * connection.subscribe("all")	// subscribe to the topic "all"
	 */
	subscribe(topic: string): void,

	/**
	 * Handling of unsubscribe a topic
	 * @param topic - the topic to unsubscribe
	 * @example
	 * connection.unsubscribe("all")	// unsubscribe to the topic "all"
	 */
	unsubscribe(topic: string): void,

	/**
	 * has it a subscription ot a topic
	 * @param topic - the topic to check
	 * @returns {boolean} - true if it has a subscription to the topic
	 * @example
	 * connection.subscribe("all")	// subscribe to the topic "all"
	 * connection.hasSubscribe("all")	// has the topic "all" => true
	 * connection.hasSubscribe("other")	// does not have the topic "other" => false
	 */
	hasSubscribe(topic: string): boolean,
}

export {
	Pubilsher,
	PubSubscriber,
	PublishCallback,
	PublishData
}