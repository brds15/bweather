type LocalNames = {
  [key: string]: string;
};

interface Location {
  country: string;
  lat: number;
  localNames?: LocalNames;
  lon: number;
  name: string;
  state?: string;
}

export type Locations = Location[];
