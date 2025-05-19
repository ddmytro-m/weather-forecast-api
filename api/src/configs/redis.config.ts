import env from "env-var"
import { RedisOptions } from "ioredis"

export function getRedisConfig(): RedisOptions {
  return {
    host: "redis",
    port: env.get("REDIS_PORT").required().asInt(),
  }
}
