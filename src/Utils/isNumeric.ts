/**
 * checks if its a numeric value
 * @param value
 * @example
 * isNumeric(2) // true
 * isNumeric("2") // true
 * isNumeric(2.2) // true
 * isNumeric("2.2") // true
 * isNumeric("A") // false
 * isNumeric([]) // false
 * isNumeric({}) // false
 */
//eslint-disable-next-line
export default function isNumeric(value: any): boolean {
	return typeof value === "number"
			|| (typeof value === "string"
		&& !Number.isNaN(parseInt(value, 10)))
}