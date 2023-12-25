import { keys } from "lodash"

export default function maxKeyLength(obj: object): number {
    return Math.max(...keys(obj).map((key: string): number => key.length))
}