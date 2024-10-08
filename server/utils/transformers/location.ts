import { Location, Locations, LocationsItems } from '~/types/location'

function unifyLocations(locations: LocationsItems) {
  return locations.filter((item, index, self) => {
    return index === self.findIndex(currentLocation => currentLocation.location === item.location)
  })
}

function transformerLocationData(locations: Locations) {
  const formatedList = locations.reduce((acc: LocationsItems, current: Location) => {
    const complement = current?.state ? `, ${current?.state}` : ''

    return [
      ...acc,
      {
        coordinates: { latitude: current.lat, longitude: current.lon },
        country: current.country.toLowerCase(),
        location: `${current.name}${complement}`,
        name: current.name
      }
    ]
  }, [])

  return unifyLocations(formatedList)
}

export default transformerLocationData
