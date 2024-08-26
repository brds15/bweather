import { WeatherData } from '~/types/weather'
import convertToCamelResponse from '~/server/utils/interceptors/response'

const ENDPOINT = 'onecall'
const QUERY_PARAMS = '&units=metric&lang=pt_br&exclude=minutely&exclude=alerts'

export default defineEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig()
  const api = `${runtimeConfig.public.apiBase}${ENDPOINT}?lat=33.44&lon=-94.04&appid=${runtimeConfig.apiSecret}${QUERY_PARAMS}`

  const result = await $fetch<WeatherData>(api)

  return convertToCamelResponse(result)
})
