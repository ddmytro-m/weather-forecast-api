import { getBullMQConfig } from "../configs/bullmq.config"

import { Queue } from "bullmq"

export const scheduleQueue = new Queue("schedule", getBullMQConfig())
