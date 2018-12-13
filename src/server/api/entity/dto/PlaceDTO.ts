import CoordinatesDTO from './CoordinatesDTO';
import ProductDTO from './ProductDTO';
import ImageDTO from './ImageDTO';
import { PlaceType } from '../enum/PlaceType';
import { ActiveStatus } from '../enum/ActiveStatus';
import { GeoDTO } from './GeoDTO';

export interface PlaceDTO extends ProductDTO {
  description: string;
  geo: GeoDTO;
  images: Array<ImageDTO>;
  type: PlaceType;
  search_name: string;
  status: ActiveStatus;
}
