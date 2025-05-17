import router from "./routes"

import express from "express"
const app = express()

app.use(router)

app.get("/hello", (req, res) => {
  res.send("Hello, world!")
})

app.listen(3000)
