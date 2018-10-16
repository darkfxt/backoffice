import { PaginationOptionsInterface } from '../common-list/common-list-item/pagination-options.interface';

export class Account {

  constructor(
    public id: string = '',
    public name: string = '',
    public primary_color: string = '#FF5252',
    public secondary_color: string = '#424242',
    public logo: any = '',
  ) {}

}

export class UserWithMetadata {
  data: Account[];
  metadata: PaginationOptionsInterface;
  constructor(accounts: Account[], metadata: PaginationOptionsInterface) {
    this.data = accounts;
    this.metadata = metadata;
  }
}
