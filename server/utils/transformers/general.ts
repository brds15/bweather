import { CurrentWeather, TransformedCurrentWeather, Weather, WeatherData } from '~/types/weather'

function transformWeather(weather: Weather) {
  return [
    {
      description: weather.description,
      icon: weather.icon,
      id: weather.id,
      main: weather.main
    }
  ]
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

function transformerGeneralData(weatherData: WeatherData) {
  return {
    current: transformCurrent(weatherData.current),
    daily: weatherData.daily,
    hourly: weatherData.hourly,
    lat: weatherData.lat,
    lon: weatherData.lon,
    timezone: weatherData.timezone,
    timezoneOffset: weatherData.timezoneOffset
  }
}

export default transformerGeneralData
