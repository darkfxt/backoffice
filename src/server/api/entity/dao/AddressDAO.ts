import { AddressDTO } from '../dto/AddressDTO';

export interface IAddressDAO {
  country: string;
  locality: string;
  region: string;
  postalCode: string;
  route: string;
  streetNumber: string;
  formattedAddress: string;
}

export class AddressDAO implements IAddressDAO {
  formattedAddress: string;
  locality: string;
  postalCode: string;
  region: string;
  route: string;
  streetNumber: string;
  country: string;

  constructor(params: any = {}) {
    this.formattedAddress = params.FormattedAddress || '';
    this.locality = params.locality || '';
    this.postalCode = params.postalCode || '';
    this.region = params.region || '';
    this.route = params.route || '';
    this.streetNumber = params.streetNumber || '';
    this.country = params.country || '';
  }

  static fitFromDTO(adaptee: AddressDTO) {
    const params = {
      country: adaptee.country,
      streetNumber: adaptee.street_number,
      formattedAddress: adaptee.formatted_address,
      locality: adaptee.locality,
      postalCode: adaptee.postalCode,
      region: adaptee.region,
      route: adaptee.route
    };
    return new AddressDAO(params);
  }
}
