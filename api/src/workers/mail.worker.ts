import { getBullMQConfig } from "../configs/bullmq.config"
import { mailQueue } from "../queues/MailQueue"
import { mailService } from "../services/MailService"
import { weatherService } from "../services/WeatherService"
import { Subscription } from "../types/interfaces/Subscription"
import type { Mail } from "../types/models/Mail"
import { WeatherMail } from "../types/models/WeatherMail"

import { Worker } from "bullmq"

export const mailWorker = new Worker(
  "mail",
  async (job) => {
    if (job.name === "send-mail") {
      const mail: Mail = job.data
      await mailService.sendMail(mail)
    } else if (job.name === "send-weather-mail") {
      const subscription: Subscription = job.data
      const weather = await weatherService.getWeatherByCity(subscription.city)
      const mail = new WeatherMail(subscription.email, weather)
      await mailQueue.add("send-mail", mail, {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 20000,
        },
      })
    }
  },
  {
    ...getBullMQConfig(),
    autorun: false,
  },
)
