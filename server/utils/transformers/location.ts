import { Location, Locations, LocationsInfo } from '~/types/location'

function unifyLocations(locations: LocationsInfo) {
  return locations.filter((item, index, self) => {
    return index === self.findIndex(currentLocation => currentLocation.location === item.location)
  })
}

function transformerLocationData(locations: Locations) {
  const formatedList = locations.reduce((acc: LocationsInfo, current: Location) => {
    const complement = current?.state ? `, ${current?.state}` : ''

    return [
      ...acc,
      {
        cordinates: { latitude: current.lat, longitude: current.lon },
        country: current.country.toLowerCase(),
        location: `${current.name}${complement}`,
        name: current.name
      }
    ]
  }, [])

  return unifyLocations(formatedList)
}

export default transformerLocationData
