import { Location, Locations, LocationsInfo } from '~/types/location'

function unifyLocations(locations: LocationsInfo) {
  return locations.filter((item, index, self) => {
    return index === self.findIndex(currentLocation => currentLocation.location === item.location)
  })
}

function transformerLocationData(locations: Locations) {
  const formatedList = locations.reduce((acc: LocationsInfo, current: Location) => {
    return [
      ...acc,
      {
        cordinates: { latitude: current.lat, longitude: current.lon },
        location: `${current.country} | ${current.name} | ${current.state}`,
        name: current.name
      }
    ]
  }, [])

  return unifyLocations(formatedList)
}

export default transformerLocationData
