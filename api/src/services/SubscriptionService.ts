import { prisma } from "../prisma/prisma"
import { mailQueue } from "../queues/MailQueue"
import type { Subscription } from "../types/interfaces/Subscription"
import { TokenMail } from "../types/models/TokenMail"

import createHttpError from "http-errors"

class SubscriptionService {
  private async emailExists(email: string) {
    return (await prisma.subscription.count({ where: { email } })) > 0
  }

  private async isTokenValid(token: string, confirmed: boolean) {
    return await prisma.subscription.count({
      where: { token, confirmed },
    })
  }

  public async subscribe(data: Subscription) {
    if (await this.emailExists(data.email)) throw createHttpError(409, "Email already subscribed")

    const { token } = await prisma.subscription.create({
      data: {
        email: data.email,
        city: data.city,
        frequency: data.frequency,
      },
      select: { token: true },
    })

    const mail = new TokenMail(data.email, token)
    mailQueue.add("send-mail", mail)
  }

  public async confirm(token: string) {
    if (!(await this.isTokenValid(token, false))) throw createHttpError(404, "Token not found")

    await prisma.subscription.update({
      where: { token },
      data: { confirmed: true },
    })
  }

  public async unsubscribe(token: string) {
    if (!(await this.isTokenValid(token, true))) throw createHttpError(404, "Token not found")

    await prisma.subscription.delete({ where: { token } })
  }

  public async getSubscriptions(frequency: "hourly" | "daily"): Promise<Subscription[]> {
    return await prisma.subscription.findMany({
      where: {
        confirmed: true,
        frequency,
      },
      select: {
        email: true,
        city: true,
        frequency: true,
      },
    })
  }
}

export const subscriptionService = new SubscriptionService()
