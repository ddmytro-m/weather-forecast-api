import { QueueOptions } from "bullmq"

export function getBullMQConfig(): QueueOptions {
  return {
    connection: {
      host: "redis",
      port: 6379,
    },
  }
}
