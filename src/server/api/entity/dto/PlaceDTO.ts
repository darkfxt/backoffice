import CoordinatesDTO from './CoordinatesDTO';
import ProductDTO from './ProductDTO';
import ImageDTO from './ImageDTO';
import { PlaceType } from '../enum/PlaceType';
import { ActiveStatus } from '../enum/ActiveStatus';

export interface PlaceDTO extends ProductDTO {
  description: string;
  geo: CoordinatesDTO;
  images: Array<ImageDTO>;
  type: PlaceType;
  search_name: string;
  status: ActiveStatus;
}
