import { IProductDAO } from './IProductDAO';
import { IImageDAO } from './ImageDAO';
import { IGeoDAO } from './GeoDAO';
import { ActiveStatus } from '../enum/ActiveStatus';
import { ObjectID } from 'typeorm';
import { GeometryType } from '../enum/GeometryType';
import { PlaceType } from '../enum/PlaceType';
import { AddressDAO } from './AddressDAO';

export interface IPlaceDAO extends IProductDAO {
  search_name: string;
  description: string;
  geo: IGeoDAO;
  images: Array<IImageDAO>;
  status: ActiveStatus;
  ancestors: IAncestorsDAO;
  descendants: IDescendantsDAO;
  type: PlaceType;
  address: AddressDAO;
  terminal: boolean;
  place_id?: string;
  default_lang: string;
}

export interface IAncestorsDAO {
  id: ObjectID;
  type: GeometryType;
}

export interface IDescendantsDAO {
  Cities: ObjectID;
  Countries: ObjectID;
  POIs: ObjectID;
  HighLevelRegions: ObjectID;
  TrainStations: ObjectID;
  MetroStations: ObjectID;
  Neighbourhoods: ObjectID;
  ProvinceStates: ObjectID;
  MultiCityVicinities: ObjectID;
  Hotels: ObjectID;
  Destinations: ObjectID;
  Activities: ObjectID;
  Airports: ObjectID;
}


