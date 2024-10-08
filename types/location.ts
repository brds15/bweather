import type { Coordinates } from '~/types/weather'

type LocalNames = {
  [key: string]: string
}

export interface Location {
  country: string
  lat: number
  localNames?: LocalNames
  lon: number
  name: string
  state?: string
}

export type Locations = Location[]

export interface LocationItem {
  coordinates: Coordinates
  country: string
  location: string
  name: string
}

export type LocationsItems = LocationItem[]
