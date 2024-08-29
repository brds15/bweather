import { WeatherData } from '~/types/weather'
import convertToCamelResponse from '~/server/utils/interceptors/response'
import transformerGeneralData from '~/server/utils/transformers/general'

const ENDPOINT = 'data/3.0/onecall'
const QUERY_PARAMS = '&units=metric&lang=pt_br&exclude=minutely&exclude=alerts'

export default defineEventHandler(async event => {
  const runtimeConfig = useRuntimeConfig()
  const latitude = getRouterParam(event, 'latitude')
  const longitude = getRouterParam(event, 'longitude')
  const api = `${runtimeConfig.public.apiBase}${ENDPOINT}?lat=${latitude}&lon=${longitude}&appid=${runtimeConfig.apiSecret}${QUERY_PARAMS}`

  const result = await $fetch<WeatherData>(api)
  const convertedData = convertToCamelResponse(result)

  return transformerGeneralData(convertedData)
})
