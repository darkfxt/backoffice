import { PaginationOptionsInterface } from '../common-list/common-list-item/pagination-options.interface';

export class User {

  constructor(
    public id: string = '',
    public username: string = '',
    public password: string = '',
    public email: string = '',
    public company_id: any = '',
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

export interface LoginServerResponse {
  code: number;
  token: string;
  expire: string;
  user: any;
}

class Role {
  username: string;
  resource: Array<ResourcePermission>;
}

class ResourcePermission {
  name: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

export interface LoggedUserInterface {
  id: number;
  username: string;
  role: Role;
}
