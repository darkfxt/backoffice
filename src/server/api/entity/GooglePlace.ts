export class AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export class Location {
  lat: number;
  lng: number;
}

export class Geometry {
  location: Location;
}

export class Photo {
  height: number;
  photo_reference: string;
  width: number;
}


export default class GooglePlace{
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry
  name: string;
  photos: Photo[];
  place_id: string;
  rating: number;
  types: string[];
}

