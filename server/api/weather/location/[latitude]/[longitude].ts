import convertToCamelResponse from '~/server/utils/interceptors/response'
import transformerLocationData from '~/server/utils/transformers/location'
import { Locations } from '~/types/location'

const ENDPOINT = '/geo/1.0/reverse'
const QUERY_PARAMS = '&limit=1'

export default defineEventHandler(async event => {
  const runtimeConfig = useRuntimeConfig()
  const latitude = getRouterParam(event, 'latitude')
  const longitude = getRouterParam(event, 'longitude')

  const api = `${runtimeConfig.public.apiBase}${ENDPOINT}?lat=${latitude}&lon=${longitude}${QUERY_PARAMS}&appid=${runtimeConfig.apiSecret}`

  const result = await $fetch<Locations>(api)

  const convertedResult = convertToCamelResponse(result)

  return transformerLocationData(convertedResult)
})
