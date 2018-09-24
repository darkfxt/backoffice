import { PaginationOptionsInterface } from '../common-list/common-list-item/pagination-options.interface';

export class User {

  constructor(
    public id: string = '',
    public name: string = '',
    public last_name: string = '',
    public email: string = '',
    public organization: any = '',
    public role: string = ''
  ) {}

}

export class UserWithMetadata {
  data: User[];
  metadata: PaginationOptionsInterface;
  constructor(users: User[], metadata: PaginationOptionsInterface) {
    this.data = users;
    this.metadata = metadata;
  }
}
