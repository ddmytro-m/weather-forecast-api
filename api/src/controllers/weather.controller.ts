import { weatherService } from "../services/WeatherService"

import type { Request, Response } from "express"
import { matchedData, validationResult } from "express-validator"
import createHttpError from "http-errors"

export const handleGetWeather = async (req: Request, res: Response) => {
  const result = validationResult(req)
  if (!result.isEmpty()) throw createHttpError(400, "Invalid request")

  const data = matchedData<{ city: string }>(req)
  const weather = await weatherService.getWeatherByCity(data.city)

  res.send(weather)
}
