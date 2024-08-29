import { WeatherData } from '~/types/weather'
import { parseCookies } from 'h3'
import convertToCamelResponse from '~/server/utils/interceptors/response'
import transformerGeneralData from '~/server/utils/transformers/general'

export default defineEventHandler(async event => {
  const DEFAULT_LOCALE = 'en'
  const ENDPOINT = 'data/3.0/onecall'
  const cookies = parseCookies(event)
  const currentLocale = cookies['i18n_redirected'] || DEFAULT_LOCALE
  const QUERY_PARAMS = `&units=metric&lang=${currentLocale}&exclude=minutely&exclude=alerts`
  const runtimeConfig = useRuntimeConfig()
  const latitude = getRouterParam(event, 'latitude')
  const longitude = getRouterParam(event, 'longitude')
  const api = `${runtimeConfig.public.apiBase}${ENDPOINT}?lat=${latitude}&lon=${longitude}&appid=${runtimeConfig.apiSecret}${QUERY_PARAMS}`

  const result = await $fetch<WeatherData>(api)
  const convertedData = convertToCamelResponse(result)

  return transformerGeneralData(convertedData)
})
