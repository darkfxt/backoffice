import ICoordinatesDTO from './ICoordinatesDTO';
import IProductDTO from './IProductDTO';
import { ImageDTO } from './ImageDTO';
import { PlaceType } from '../enum/PlaceType';
import { ActiveStatus } from '../enum/ActiveStatus';
import { IGeoDTO } from './IGeoDTO';

export interface IPlaceDTO extends IProductDTO {
  description: string;
  geo: IGeoDTO;
  images: Array<ImageDTO>;
  type: PlaceType;
  search_name: string;
  status: ActiveStatus;
  default_lang: string;
}
