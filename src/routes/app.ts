import express, { Express } from "express"
import api from "./api"
import { logging } from "../middleware"

// Init express
const app: Express = express()

// express app routes logging
app.use(logging)


// adding the app routes to app
app.use("/api", api)

// export the app
export default app