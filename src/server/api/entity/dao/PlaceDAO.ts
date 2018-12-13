import { ProductDAO } from './ProductDAO';
import { ImageDAO } from './ImageDAO';
import { GeoDAO } from './GeoDAO';
import { ActiveStatus } from '../enum/ActiveStatus';
import { ObjectID } from 'typeorm';
import { GeometryType } from '../enum/GeometryType';

export interface PlaceDAO extends ProductDAO {
  search_name: string;
  description: string;
  geo: GeoDAO;
  images: ImageDAO;
  status: ActiveStatus;
  ancestors: AncestorsDAO;
  descendants: DescendantsDAO;
}

interface AncestorsDAO {
  id: ObjectID;
  type: GeometryType;
}

interface DescendantsDAO {
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
