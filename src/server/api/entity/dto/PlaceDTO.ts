import { ActiveStatus } from '../enum/ActiveStatus';
import { PlaceType } from '../enum/PlaceType';
import { ProductDTO } from './ProductDTO';
import { GeoDTO } from './GeoDTO';
import { IPlaceDTO } from './IPlaceDTO';
import { ImageDTO } from './ImageDTO';

export class PlaceDTO extends ProductDTO implements IPlaceDTO {
  description: string;
  geo: GeoDTO;
  images: Array<ImageDTO>;
  search_name: string;
  status: ActiveStatus;
  type: PlaceType;
  default_lang: string;

}
