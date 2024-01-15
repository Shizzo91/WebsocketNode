import { Payload } from "../jwt"
import { Request } from "express"

/**
 * PayloadRequest interface.
 * @interface PayloadRequest
 * @extends {Request}
 * @param {Payload} payload - The payload.
 */
export default interface PayloadRequest extends Request {
	payload: Payload
}