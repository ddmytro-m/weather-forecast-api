import type { Weather } from "../interfaces/Weather"

import { Mail } from "./Mail"

export class WeatherMail extends Mail {
  constructor(email: string, weather: Weather) {
    super(email, "Weather Update", "weather", { weather })
  }
}
