import { getBullMQConfig } from "../configs/bullmq.config"
import { mailQueue } from "../queues/MailQueue"
import { subscriptionService } from "../services/SubscriptionService"

import { Worker } from "bullmq"

export const scheduleWorker = new Worker(
  "schedule",
  async (job) => {
    if (job.name === "hourly-emails") {
      const subscriptions = await subscriptionService.getSubscriptions("hourly")
      for (const subscription of subscriptions) {
        await mailQueue.add("send-weather-mail", subscription)
      }
    } else if (job.name === "daily-emails") {
      const subscriptions = await subscriptionService.getSubscriptions("daily")
      for (const subscription of subscriptions) {
        await mailQueue.add("send-weather-mail", subscription)
      }
    }
  },
  {
    ...getBullMQConfig(),
    autorun: false,
  },
)
