export interface WeatherApiResponse {
  location: {
    name: string
    country: string
  }
  current: {
    temp_c: number
    humidity: number
    condition: {
      text: string
    }
  }
}
