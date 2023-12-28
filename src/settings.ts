import { getBoolean, getInteger, getString } from "./Utils/Environment"

const HOST: string = getString("HOST", "0.0.0.0")
const PORT: number = getInteger("PORT", 9999)
const PROD: boolean = getBoolean("PROD", false)

export {
	HOST,
	PORT,
	PROD
}