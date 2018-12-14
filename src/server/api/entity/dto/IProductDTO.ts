import EventType from '../enum/EventType';
import { PlaceType } from '../enum/PlaceType';
import { RouteType } from '../enum/RouteType';

interface IProductDTO {
  _id: string;
  name: string;
  company_id: number;
  created_by: string;
  type?: RouteType | PlaceType;
}

export default IProductDTO;
