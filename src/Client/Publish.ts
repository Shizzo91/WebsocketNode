import Client from "./Client";

type PublishCallback = (client: Client) => void

type PublishData = string | PublishCallback

type Pubilsher = {
    /**
     * Handling of a incoming publish event
     * @param topic
     * @param data
     */
    publish(topic: string, data: PublishData): void
}

type PubSubscriber = Pubilsher & {
    /**
     * Handling of subscribe a topic
     * @param topic
     */
    subscribe(topic: string): void,

    /**
     * Handling of unsubscribe a topic
     * @param topic
     */
    unsubscribe(topic: string): void,

    /**
     * has it a subscription ot a topic
     * @param topic
     */
    hasSubscribe(topic: string): boolean,
}

export {
    Pubilsher,
    PubSubscriber,
    PublishCallback,
    PublishData
}