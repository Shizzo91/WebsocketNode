import http from "http"
import app from "./app"

const server: http.Server = http.createServer(app)
export default server