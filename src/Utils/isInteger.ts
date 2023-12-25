import isNumeric from "./isNumeric"

/**
 * checks if its a integer value
 * @param value
 * @example
 * isInteger(2) // true
 * isInteger("2") // true
 * isInteger("2.2") // false
 */
//eslint-disable-next-line
export default function isInteger(value: any): boolean {
    return isNumeric(value) && value % 1 === 0
}