export class Address{
  country_code: string;
  country: string;
  locality: string;
  region: string;
  postalCode: string;
  route: string;
  street_number: string;
  formatted_address: string;
}

export class Geo{
  point: Point;
  address: Address;
}

export class Point{
  lat: number;
  lng: number;
}

export default class Place{
  _id: string;
  place_id: string;
  name: string;
  description: string;
  type: string;
  status: number;
  geo: Geo;
  images: any[];
}
