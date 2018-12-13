import CoordinatesDTO from './CoordinatesDTO';
import { AddressDTO } from './AddressDTO';

export interface GeoDTO {
  address: AddressDTO;
  label: string;
  point: CoordinatesDTO;
}
