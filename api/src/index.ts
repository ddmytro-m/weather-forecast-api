import { mailService } from "./services/MailService"
import router from "./routes"

import express from "express"
const app = express()

void (async () => {
  await mailService.load()

  app.use(express.json())
  app.use(router)

  app.get("/hello", (req, res) => {
    res.send("Hello, world!")
  })

  app.listen(3000)
})()
