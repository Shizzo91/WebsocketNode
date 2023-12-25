import {snakeCase} from "lodash"

export default function screamCase(str: string): string {
	return snakeCase(str).toUpperCase()
}