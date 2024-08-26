import convertToCamelResponse from '~/server/utils/interceptors/response'
import { Locations } from '~/types/location'

const ENDPOINT = '/geo/1.0/direct'
const QUERY_PARAMS = '&limit=5'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const locationToSearch = getRouterParam(event, 'location')
  const api = `${runtimeConfig.public.apiBase}${ENDPOINT}?q=${locationToSearch}${QUERY_PARAMS}&appid=${runtimeConfig.apiSecret}`

  const result = await $fetch<Locations>(api)

  return convertToCamelResponse(result)
})
