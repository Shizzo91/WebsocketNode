import { timeFormatter } from "../Utils"


export default class ConnectionTimer {
	constructor(
		public readonly start: Date = new Date()
	) {}

	/**
	 * returns the time remaining in milliseconds
	 * @returns {number}
	 * @example
	 * const timer: ConnectionTimer = new ConnectionTimer()
	 * timer.getTimeRemaining() // 0
	 * // wait 1 second
	 * timer.getTimeRemaining() // 1000
	 * // wait 1 second
	 * timer.getTimeRemaining() // 2000
	 */
	public getTimeRemaining(): number {
		const now: Date = new Date()
		return now.getTime() - this.start.getTime()
	}


	/**
	 * returns the time remaining in milliseconds
	 * @returns {number}
	 * @example
	 * const timer: ConnectionTimer = new ConnectionTimer()
	 * timer.getTimeRemaining() // 0
	 * // wait 1 second
	 * timer.toString() // "000d 00h 00m 01s 000ms"
	 * // wait 1 second
	 * timer.toString() // "000d 00h 00m 02s 000ms"
	 */
	public toString(): string {
		return timeFormatter(this.getTimeRemaining())
	}

}