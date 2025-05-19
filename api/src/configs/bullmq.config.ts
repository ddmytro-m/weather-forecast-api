import { QueueOptions } from "bullmq"
import env from "env-var"

export function getBullMQConfig(): QueueOptions {
  return {
    connection: {
      host: "redis",
      port: env.get("REDIS_PORT").required().asInt(),
    },
  }
}
