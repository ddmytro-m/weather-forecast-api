import { redis } from "../redis/redis"
import type { Weather } from "../types/interfaces/Weather"
import { WeatherApiResponse } from "../types/interfaces/WeatherApiResponse"

import axios, { AxiosError, AxiosInstance } from "axios"
import createHttpError from "http-errors"
import ms from "ms"

class WeatherService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: "https://api.weatherapi.com/v1",
      headers: { key: process.env.API_KEY },
    })
  }

  public async getWeatherByCity(city: string): Promise<Weather> {
    const redisCityKey = `weather:city:${city.toLowerCase()}`
    const cached = await redis.get(redisCityKey)
    if (cached) {
      try {
        return JSON.parse(cached)
      } catch {
        await redis.del(redisCityKey)
      }
    }

    try {
      const { data } = await this.api.get<WeatherApiResponse>("/current.json", {
        params: { q: city.toLowerCase() },
      })

      const result = {
        temperature: data.current.temp_c,
        humidity: data.current.humidity,
        description: data.current.condition.text,
      }

      await redis.set(redisCityKey, JSON.stringify(result), "PX", ms("15m"))

      return result
    } catch (e) {
      if (e instanceof AxiosError && e.status === 400) throw createHttpError(404, "City not found")
      throw e
    }
  }
}

export const weatherService = new WeatherService()
