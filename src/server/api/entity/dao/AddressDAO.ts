import { AddressDTO } from '../dto/AddressDTO';

export interface IAddressDAO {
  country: string;
  locality: string;
  region: string;
  postalCode: string;
  route: string;
  street_number: string;
  formatted_address: string;
}

export class AddressDAO implements IAddressDAO {
  formatted_address: string;
  locality: string;
  postalCode: string;
  region: string;
  route: string;
  street_number: string;
  country: string;

  constructor(params: any = {}) {
    this.formatted_address = params.formatted_address || '';
    this.locality = params.locality || '';
    this.postalCode = params.postalCode || '';
    this.region = params.region || '';
    this.route = params.route || '';
    this.street_number = params.street_number || '';
    this.country = params.country || '';
  }

  static fitFromDTO(adaptee: AddressDTO) {
    const params = {
      country: adaptee.country,
      street_number: adaptee.street_number,
      formatted_address: adaptee.formatted_address,
      locality: adaptee.locality,
      postalCode: adaptee.postalCode,
      region: adaptee.region,
      route: adaptee.route
    };
    return new AddressDAO(params);
  }
}
