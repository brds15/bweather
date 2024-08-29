import { WeatherData } from '~/types/weather'
import convertToCamelResponse from '~/server/utils/interceptors/response'
import getCurrentLocale from '~/server/utils/locales'
import transformerGeneralData from '~/server/utils/transformers/general'
import { ONECALL_ENDPOINT } from '~/server/constants'

export default defineEventHandler(async event => {
  const currentLocale = getCurrentLocale(event)
  const QUERY_PARAMS = `&units=metric&lang=${currentLocale}&exclude=minutely&exclude=alerts`
  const runtimeConfig = useRuntimeConfig()
  const latitude = getRouterParam(event, 'latitude')
  const longitude = getRouterParam(event, 'longitude')
  const api = `${runtimeConfig.public.apiBase}${ONECALL_ENDPOINT}?lat=${latitude}&lon=${longitude}&appid=${runtimeConfig.apiSecret}${QUERY_PARAMS}`

  const result = await $fetch<WeatherData>(api)
  const convertedData = convertToCamelResponse(result)

  return transformerGeneralData(convertedData)
})
