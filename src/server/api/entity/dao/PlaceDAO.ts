import { IAncestorsDAO, IDescendantsDAO, IPlaceDAO } from './IPlaceDAO';
import { GeoDAO, IGeoDAO } from './GeoDAO';
import { IImageDAO, ImageDAO } from './ImageDAO';
import { ActiveStatus } from '../enum/ActiveStatus';
import { PlaceType } from '../enum/PlaceType';
import { AddressDAO } from './AddressDAO';
import { ObjectID } from 'typeorm';
import { GeometryType } from '../enum/GeometryType';

export class PlaceDAO implements IPlaceDAO {
  ancestors: AncestorsDAO;
  company_id: number;
  created_at: string;
  created_by: string;
  descendants: DescendantsDAO;
  description: string;
  geo: GeoDAO;
  id: string;
  images: Array<ImageDAO>;
  name: string;
  search_name: string;
  status: ActiveStatus;
  type: PlaceType;
  _id: string;
  address: AddressDAO;
  terminal: boolean;
  default_lang: string;
}

export class AncestorsDAO implements IAncestorsDAO {
  id: ObjectID;
  type: GeometryType;
}

export class DescendantsDAO implements IDescendantsDAO {
  Activities: ObjectID;
  Airports: ObjectID;
  Cities: ObjectID;
  Countries: ObjectID;
  Destinations: ObjectID;
  HighLevelRegions: ObjectID;
  Hotels: ObjectID;
  MetroStations: ObjectID;
  MultiCityVicinities: ObjectID;
  Neighbourhoods: ObjectID;
  POIs: ObjectID;
  ProvinceStates: ObjectID;
  TrainStations: ObjectID;
}

