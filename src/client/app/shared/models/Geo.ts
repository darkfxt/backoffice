import { Address, IAddress } from './Address';
import { Coordinates, ICoordinates } from './Coordinates';

export interface IGeo {
  address: IAddress;
  label: string;
  point: ICoordinates;
}

export class Geo {
  address: Address;
  label: string;
  point: Coordinates;
  constructor(params: any = {}) {
    this.point = params.point || new Coordinates();
    this.address = params.address || new Address();
    this.label = params.label || '';
  }
}
