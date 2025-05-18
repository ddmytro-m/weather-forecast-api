import { WeatherApiResponse } from "../types/interfaces/WeatherApiResponse"
import type { Weather } from "../types/interfaces/Weather"

import axios, { AxiosError, AxiosInstance } from "axios"
import createHttpError from "http-errors"

class WeatherService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: "https://api.weatherapi.com/v1",
      headers: { key: process.env.API_KEY },
    })
  }

  public async getWeatherByCity(city: string): Promise<Weather> {
    try {
      const { data } = await this.api.get<WeatherApiResponse>("/current.json", {
        params: { q: city },
      })
      return {
        temperature: data.current.temp_c,
        humidity: data.current.humidity,
        description: data.current.condition.text,
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.status === 400) throw createHttpError(404, "City not found")
      }
      throw e
    }
  }
}

export const weatherService = new WeatherService()
