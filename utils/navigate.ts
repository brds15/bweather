import { ROUTES } from '~/constants'

export async function navigateToWeather() {
  await navigateTo(ROUTES.WEATHER)
}
