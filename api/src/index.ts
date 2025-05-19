import { scheduleQueue } from "./queues/ScheduleQueue"
import { mailService } from "./services/MailService"
import { mailWorker } from "./workers/mail.worker"
import { scheduleWorker } from "./workers/schedule.worker"
import router from "./routes"

import express from "express"
const app = express()

void (async () => {
  await mailService.load()

  mailWorker.run()
  scheduleWorker.run()

  await scheduleQueue.upsertJobScheduler("hourly-emails", { pattern: "0 * * * *" }) // once a hour
  await scheduleQueue.upsertJobScheduler("daily-emails", { pattern: "0 9 * * *" }) // once a day at 09:00

  app.use(express.json())
  app.use(router)

  app.listen(3000)
})()
