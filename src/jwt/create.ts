import Payload from "./Payload"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../settings"

export default function create(payload: Payload): string {
	return jwt.sign(payload, JWT_SECRET)
}