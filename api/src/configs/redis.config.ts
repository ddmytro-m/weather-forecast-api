import { RedisOptions } from "ioredis";

export function getRedisConfig(): RedisOptions {
  return {
    host: "redis",
    port: 6379,
  }
}
