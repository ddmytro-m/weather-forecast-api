import { prisma } from "../prisma/prisma"
import type { Subscription } from "../types/models/Subscription"

import createHttpError from "http-errors"
import { mailService } from "./MailService"

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

    await mailService.sendTokenEmail(data.email, token)
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
}

export const subscriptionService = new SubscriptionService()
