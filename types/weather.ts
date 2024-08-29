export interface Coordinates {
  latitude?: number
  longitude?: number
}

export interface Weather {
  description: string
  icon: string
  id: number
  main: string
}

export interface CurrentWeather {
  clouds: number
  dewPoint: number
  dt: number
  feelsLike: number
  humidity: number
  pressure: number
  sunrise: number
  sunset: number
  temp: number
  uvi: number
  visibility: number
  weather: Weather[]
  windDeg: number
  windSpeed: number
}

export interface TransformedCurrentWeather {
  clouds: string
  feelsLike: string
  humidity: string
  pressure: string
  temp: string
  uvi: number
  visibility: number
  weather: Weather[]
  windSpeed: string
}

interface HourlyWeather extends CurrentWeather {
  pop: number
  windGust?: number
}

interface Temp {
  day: number
  eve: number
  max: number
  min: number
  morn: number
  night: number
}

interface FeelsLike {
  day: number
  eve: number
  morn: number
  night: number
}

interface DailyWeather {
  clouds: number
  dewPoint: number
  dt: number
  feelsLike: FeelsLike
  humidity: number
  moonPhase: number
  moonrise: number
  moonset: number
  pop: number
  pressure: number
  summary: string
  sunrise: number
  sunset: number
  temp: Temp
  uvi: number
  weather: Weather[]
  windDeg: number
  windGust: number
  windSpeed: number
}

export interface WeatherData {
  current: CurrentWeather
  daily: DailyWeather[]
  hourly: HourlyWeather[]
  lat: number
  lon: number
  timezone: string
  timezoneOffset: number
}

export interface TransformedWeatherData {
  current: TransformedCurrentWeather
  daily: DailyWeather[]
  hourly: HourlyWeather[]
  lat: number
  lon: number
  timezone: string
  timezoneOffset: number
}
