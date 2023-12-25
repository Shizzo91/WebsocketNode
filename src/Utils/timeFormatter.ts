import fillZeros from "./fillZeros"

const MILLISECOND: number = 100
const SECOND: number = 10 * MILLISECOND
const MINUTE: number = SECOND * 60
const HOUR: number = MINUTE * 60
const DAY: number = HOUR * 24

export default function timeFormatter(timeRemaining : number): string {
	const days: number = Math.floor(timeRemaining  / DAY)
	const hours: number = Math.floor((timeRemaining % DAY) / HOUR)
	const minutes: number = Math.floor(((timeRemaining  % HOUR) / MINUTE))
	const seconds: number = Math.floor(((timeRemaining  % MINUTE) / SECOND))
	const milliseconds: number = timeRemaining % SECOND
	return `${fillZeros(days, 3)}d ${fillZeros(hours, 2)}h ${fillZeros(minutes, 2)}m ${fillZeros(seconds, 2)}s ${fillZeros(milliseconds, 3)}ms`
}