import { timeFormatter } from "../Utils"


export default class ConnectionTimer {
    constructor(
        public readonly start: Date = new Date()
    ) {}

    public getTimeRemaining(): number{
        const now: Date = new Date()
        return now.getTime() - this.start.getTime()
    }

    public toString(): string {
        return timeFormatter(this.getTimeRemaining())
    }

}