import { WeatherData } from '~/types/weather'
import convertToCamelResponse from '~/server/utils/interceptors/response'

export default defineEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig()
  const api = `${runtimeConfig.public.apiBase}onecall?lat=33.44&lon=-94.04&appid=${runtimeConfig.apiSecret}&units=metric&lang=pt_br&exclude=minutely&exclude=alerts`

  const result = await $fetch<WeatherData>(api)

  return convertToCamelResponse(result)
})
