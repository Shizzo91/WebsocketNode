import { get } from "lodash"
import dotenv from "dotenv"
dotenv.config({ path: `${process.cwd()}/.env` })
function getString(key: string, defaultValue?: string): string {
	const value: string | undefined = get(process.env, key, defaultValue)

	if (typeof value !== "string") throw new Error(`environment variable "${key}" is not a string`)
	return value
}

function getNumber(key: string, defaultValue?: number): number {
	let value: string
	try {
		value = getString(key, (typeof defaultValue === "number") ? defaultValue.toString() : undefined)
	} catch (e) {
		throw new Error(`environment variable "${key}" is not a number`)
	}

	const valueAsNumber: number = Number(value)
	if (Number.isNaN(valueAsNumber)) {
		throw new Error(`environment variable "${key}" is not a number`)
	}

	return valueAsNumber
}

function getInteger(key: string, defaultValue: number): number {
	const value: number = getNumber(key, defaultValue)

	if (!Number.isInteger(value)) {
		throw new Error(`environment variable "${key}" is not a integer`)
	}

	return value
}


function getBoolean(key: string, defaultValue: boolean = false): boolean {
	const value: string = getString(key, (defaultValue) ? "1": "0")
	return value === "1" || value === "true"
}

export {
	getString,
	getNumber,
	getInteger,
	getBoolean
}