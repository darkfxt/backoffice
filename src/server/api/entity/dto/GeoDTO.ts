import { IGeoDTO } from './IGeoDTO';
import { AddressDTO } from './AddressDTO';
import { CoordinatesDTO } from './CoordinatesDTO';

export class GeoDTO implements IGeoDTO {

  constructor(
    public address: AddressDTO,
    public label: string,
    public point: CoordinatesDTO
  ) {

  }
}
