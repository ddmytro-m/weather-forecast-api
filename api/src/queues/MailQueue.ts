import { getBullMQConfig } from "../configs/bullmq.config"

import { Queue } from "bullmq"

export const mailQueue = new Queue("mail", getBullMQConfig())
