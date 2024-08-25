import type { Coordinates } from '~/types/weather'

function getCurrentCoordinates(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        error => {
          reject(new Error(`Geolocation error: ${error.message}`))
        }
      )
    } else {
      reject(new Error('Geolocation not supported'))
    }
  })
}

export default getCurrentCoordinates
