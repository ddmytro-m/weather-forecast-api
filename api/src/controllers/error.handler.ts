import type { NextFunction, Request, Response } from "express"
import { isHttpError } from "http-errors"

export const errorHandler = async (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line
) => {
  if (isHttpError(err)) {
    res.status(err.status).send({ error: err.message })
  } else {
    res.status(500).send({ error: "Internal server error" })
    console.error(err)
  }
}
