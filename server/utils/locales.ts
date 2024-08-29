import { H3Event, parseCookies } from 'h3'
import { DEFAULT_LOCALE } from '~/server/constants'

function getCurrentLocale(event: H3Event) {
  const cookies = parseCookies(event)

  return cookies['i18n_redirected'] || DEFAULT_LOCALE
}

export default getCurrentLocale
