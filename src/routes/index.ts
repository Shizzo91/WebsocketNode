import http from "http"
import app from "./app"

// create the server
const server: http.Server = http.createServer(app)

// export the server
export default server