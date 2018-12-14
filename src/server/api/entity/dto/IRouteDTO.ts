import { IImageDTO } from './ImageDTO';
import LegDTO from './LegDTO';
import ThingToKnowDTO from './ThingToKnowDTO';
import { IPlaceDTO } from './IPlaceDTO';
import IProductDTO from './IProductDTO';

interface IRouteDTO extends IProductDTO {
  search_name: string;
  route_type: string;
  road_surface: string;
  description: string;
  images: IImageDTO[];
  origin: IPlaceDTO;
  destination: IPlaceDTO;
  middle_points: IPlaceDTO[];
  things_to_know: ThingToKnowDTO[];
  legs: LegDTO[];
  company_id: number;
  created_by: string;
}

export default IRouteDTO;
