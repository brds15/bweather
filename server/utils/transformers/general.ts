import {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
  TranformedHourlyWeather,
  TransformedCurrentWeather,
  TransformedDailyWeather,
  TransformedWeatherData,
  Weather,
  WeatherData
} from '~/types/weather'
import { timestampToDate, timestampToHour } from '~/server/utils/dataTime'

function transformWeather(weather: Weather) {
  return {
    description: weather.description,
    icon: weather.icon,
    id: weather.id,
    main: weather.main
  }
}

function transformCurrent(current: CurrentWeather): TransformedCurrentWeather {
  return {
    clouds: `${current.clouds}%`,
    feelsLike: `${Math.round(current.feelsLike)}°`,
    humidity: `${current.humidity}%`,
    pressure: `${current.pressure}hPa`,
    temp: `${Math.round(current.temp)}°`,
    uvi: current.uvi,
    visibility: current.visibility,
    weather: transformWeather(current.weather[0]),
    windSpeed: `${current.windSpeed}mph`
  }
}

function transformHourly(hourlyItems: HourlyWeather[]): TranformedHourlyWeather[] {
  return hourlyItems.map(item => {
    return {
      dt: timestampToHour(item.dt),
      icon: item.weather[0].icon,
      temp: `${Math.round(item.temp)}°`
    }
  })
}

function transformDaily(dailyItems: DailyWeather[]): TransformedDailyWeather[] {
  return dailyItems.map(item => {
    return {
      dt: timestampToDate(item.dt),
      icon: item.weather[0].icon,
      max: `${Math.round(item.temp.max)}°`,
      min: `${Math.round(item.temp.min)}°`,
      windSpeed: `${item.windSpeed}mph`
    }
  })
}

function transformerGeneralData(weatherData: WeatherData): TransformedWeatherData {
  return {
    current: transformCurrent(weatherData.current),
    daily: transformDaily(weatherData.daily).slice(1, 4),
    hourly: transformHourly(weatherData.hourly).slice(1, 6),
    lat: weatherData.lat,
    lon: weatherData.lon,
    timezone: weatherData.timezone,
    timezoneOffset: weatherData.timezoneOffset
  }
}

export default transformerGeneralData
