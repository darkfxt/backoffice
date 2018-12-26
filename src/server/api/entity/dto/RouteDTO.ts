import IRouteDTO from './IRouteDTO';
import { IPlaceDTO } from './IPlaceDTO';
import { ImageDTO } from './ImageDTO';
import LegDTO from './LegDTO';
import ThingToKnowDTO from './ThingToKnowDTO';
import { ProductDTO } from './ProductDTO';
import { RouteType } from '../enum/RouteType';

export class RouteDTO extends ProductDTO {
  description: string;
  destination: IPlaceDTO;
  images: ImageDTO[];
  legs: LegDTO[];
  middle_points: IPlaceDTO[];
  origin: IPlaceDTO;
  road_surface: string;
  route_type: string;
  search_name: string;
  things_to_know: ThingToKnowDTO[];
  type: RouteType;
}
