export interface IAddress {
  country: string;
  country_code: string;
  locality: string;
  region: string;
  postalCode: string;
  route: string;
  street_number: string;
  formatted_address: string;
}

export class Address implements IAddress {
  country: string;
  country_code: string;
  formatted_address: string;
  locality: string;
  postalCode: string;
  region: string;
  route: string;
  street_number: string;
  constructor(params: any = {}) {
    this.country_code = params.country_code || '';
    this.country = params.country || '';
    this.locality = params.locality || '';
    this.region = params.region || '';
    this.postalCode = params.postalCode || '';
    this.route = params.route || '';
    this.street_number = params.street_number || '';
    this.formatted_address = params.formatted_address || '';
  }
}
