import { getRedisConfig } from "../configs/redis.config"

import Redis from "ioredis"

export const redis = new Redis(getRedisConfig())
