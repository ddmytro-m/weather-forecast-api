import { subscriptionService } from "../services/SubscriptionService"
import type { Subscription } from "../types/interfaces/Subscription"

import type { Request, Response } from "express"
import { matchedData, validationResult } from "express-validator"
import createHttpError from "http-errors"

export const handleSubscribe = async (req: Request, res: Response) => {
  const result = validationResult(req)
  if (!result.isEmpty()) throw createHttpError(400, "Invalid request")

  const data = matchedData<Subscription>(req)
  await subscriptionService.subscribe(data)

  res.sendStatus(200)
}

export const handleConfirm = async (req: Request, res: Response) => {
  const result = validationResult(req)
  if (!result.isEmpty()) throw createHttpError(400, "Invalid token")

  const { token } = matchedData<{ token: string }>(req)
  await subscriptionService.confirm(token)

  res.sendStatus(200)
}

export const handleUnsubscribe = async (req: Request, res: Response) => {
  const result = validationResult(req)
  if (!result.isEmpty()) throw createHttpError(400, "Invalid token")

  const { token } = matchedData<{ token: string }>(req)
  await subscriptionService.unsubscribe(token)

  res.sendStatus(200)
}
