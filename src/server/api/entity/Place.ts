/*
export class Address {
  country_code: string;
  country: string;
  locality: string;
  region: string;
  postalCode: string;
  route: string;
  street_number: string;
  formatted_address: string;

  constructor(params: any = {}) {
    this.country_code = params.country_code || '';
    this.country = params.country || '';
    this.locality = params.locality || '';
    this.region = params.region || '';
    this.postalCode = params.postalCode || '';
    this.route = params.route || '';
    this.street_number = params.street_number || '';
    this.formatted_address = params.formatted_address || '';
  }
}

export class Geo {
  point: Point;
  address: Address;

  constructor(params: any = {}) {
    this.point = params.point || new Point();
    this.address = params.address || new Address();
  }
}

export class Point {
  lat: number;
  lng: number;

  constructor(params: any = {}) {
    this.lat = params.lat || 0;
    this.lng = params.lng || 0;
  }
}

export default class Place {
  _id: string;
  place_id: string;
  name: string;
  search_name: string;
  description: string;
  type: string;
  status: number;
  geo: Geo;
  images: any[];
  company_id: number;
  created_by: string;

  constructor(params: any = {}) {
    this._id = params._id;
    this.place_id = params.place_id || '';
    this.name = params.name || '';
    this.search_name = params.search_name || '';
    this.description = params.description || '';
    this.type = params.type || '';
    this.status = params.status || 1;
    this.geo = params.geo || new Geo();
    this.images = params.images || [];
    this.company_id = params.company_id;
    this.created_by = params.created_by;
  }
}
*/
import { PlaceDTO } from './dto/PlaceDTO';
import CoordinatesDTO from './dto/CoordinatesDTO';
import ImageDTO from './dto/ImageDTO';
import { PlaceType } from './enum/PlaceType';
import { ActiveStatus } from './enum/ActiveStatus';

export default class Place implements PlaceDTO {
  _id: string;
  company_id: number;
  created_by: string;
  description: string;
  geo: CoordinatesDTO;
  images: Array<ImageDTO>;
  name: string;
  type: PlaceType;
  search_name: string;
  status: ActiveStatus;

  constructor(params: any = {}) {
    this._id = params._id;
    this.name = params.name || '';
    this.search_name = params.search_name || '';
    this.description = params.description || '';
    this.type = params.type || '';
    this.status = params.status || 1;
    this.geo = params.geo || [];
    this.images = params.images || [];
    this.company_id = params.company_id;
    this.created_by = params.created_by;
  }
}
