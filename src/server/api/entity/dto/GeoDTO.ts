import CoordinatesDTO from './CoordinatesDTO';

export interface GeoDTO {
  address: AddressDTO;
  label: string;
  point: CoordinatesDTO;
}
