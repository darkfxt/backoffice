import ICoordinatesDTO from './ICoordinatesDTO';
import { IAddressDTO } from './IAddressDTO';

export interface IGeoDTO {
  address: IAddressDTO;
  label?: string;
  point: ICoordinatesDTO;
}
