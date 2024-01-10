import { getBoolean, getInteger, getString } from "./Utils/Environment"
import dotenv from "dotenv"
dotenv.config()
export const HOST: string = getString("HOST", "0.0.0.0")
export const PORT: number = getInteger("PORT", 9999)
export const PROD: boolean = getBoolean("PROD", false)
