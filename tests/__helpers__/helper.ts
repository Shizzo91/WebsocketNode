import app from "../../src/routes/app"
import request, { Response } from "supertest"
import { create } from "../../src/jwt"

const auth = (payloadExtras: object) => {
	const payload = { exp: Math.floor(Date.now() / 1000) + 200, iat: Math.floor(Date.now() / 1000) - 1000 }
	const token = create({ ...payload,  ...payloadExtras })
	return `Bearer ${token}`
}


const authorizedRequest = {
	get: function (url: string, payloadExtras: object = {}) {
		return request(app)
			.get(url)
			.set("Accept", "application/json")
			.set("Authorization", auth(payloadExtras))
	},
	post: (url: string, payloadExtras: object = {}) => {
		return request(app)
			.post(url)
			.set("Accept", "application/json")
			.set("Authorization", auth(payloadExtras))
	},
	put: (url: string, payloadExtras: object = {}) => {
		return request(app)
			.put(url)
			.set("Accept", "application/json")
			.set("Authorization", auth(payloadExtras))
	},
	delete: (url: string, payloadExtras: object = {}) => {
		return request(app)
			.delete(url)
			.set("Accept", "application/json")
			.set("Authorization", auth(payloadExtras))
	},
}

const unauthorizedRequest = {
	get: (url: string) => {
		return request(app)
			.get(url)
			.set("Accept", "application/json")
	},
	post: (url: string) => {
		return request(app)
			.post(url)
			.set("Accept", "application/json")
	},
	put: (url: string) => {
		return request(app)
			.put(url)
			.set("Accept", "application/json")
	},
	delete: (url: string) => {
		return request(app)
			.delete(url)
			.set("Accept", "application/json")
	},
}


export {
	authorizedRequest,
	unauthorizedRequest,
	Response,
}