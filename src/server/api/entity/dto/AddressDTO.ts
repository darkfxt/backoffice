import { IAddressDTO } from './IAddressDTO';

export class AddressDTO implements IAddressDTO {
  country: string;
  country_code: string;
  formatted_address: string;
  locality: string;
  postalCode: string;
  region: string;
  route: string;
  street_number: string;
}
