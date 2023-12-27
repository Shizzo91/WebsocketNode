import fillZeros from "./fillZeros"
import { findIndex } from "lodash"

const MILLISECOND: number = 100
const SECOND: number = 10 * MILLISECOND
const MINUTE: number = SECOND * 60
const HOUR: number = MINUTE * 60
const DAY: number = HOUR * 24

type DurationItem = {
	time: number,
	fillZeros: number,
	unit: {
		short: string,
		long: string,
	}
}

type Duration = DurationItem[]

function timeRemainingToDuration(timeRemaining : number): Duration {
	return [
		{
			time: Math.floor(timeRemaining  / DAY),
			fillZeros: 3,
			unit: {
				short: "d",
				long: "days",
			},
		},
		{
			time: Math.floor((timeRemaining % DAY) / HOUR),
			fillZeros: 2,
			unit: {
				short: "h",
				long: "hours",
			},
		},
		{
			time: Math.floor(((timeRemaining  % HOUR) / MINUTE)),
			fillZeros: 2,
			unit: {
				short: "m",
				long: "minutes",
			},
		},
		{
			time: Math.floor(((timeRemaining  % MINUTE) / SECOND)),
			fillZeros: 2,
			unit: {
				short: "s",
				long: "seconds",
			},
		},
		{
			time: timeRemaining % SECOND,
			fillZeros: 3,
			unit: {
				short: "ms",
				long: "milliseconds",
			},
		},
	]
}

type TimeFormatterOptions = {
	removeHeadingZeros?: boolean,
	shorthand?: boolean,
	fill?: string
}

/**
 *
 * @param timeRemaining
 * @param options
 */
export default function timeFormatter(timeRemaining : number, options?: TimeFormatterOptions): string {
	const removeHeadingZeros: boolean = options?.removeHeadingZeros ?? false
	const shorthand: boolean = options?.shorthand ?? true
	const fill: string = options?.fill ?? ""
	const durationItems: Duration = timeRemainingToDuration(timeRemaining)

	const fristIndex = (removeHeadingZeros)
		? findIndex<DurationItem>(durationItems, (value: DurationItem): boolean => value.time > 0)
		: 0

	return durationItems
		.reduce((acc: string, currentValue: DurationItem, currentIndex: number) => {
			if (currentIndex >= fristIndex) {
				const unit: string = (shorthand) ? currentValue.unit.short : currentValue.unit.long
				acc += ` ${fillZeros(currentValue.time, currentValue.fillZeros)}${fill}${unit}`
			}
			return acc
		}, "")
		.trim()

}