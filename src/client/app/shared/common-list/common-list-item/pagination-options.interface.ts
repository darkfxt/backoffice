enum sort {
  'ASC', 'DES'
}

export interface PaginationOptionsInterface {
  previousPageIndex: number;
  pageIndex: number;
  pageSize: number;
  length: number;
  search?: string;
  sort?: sort;
  orderBy?: string;
  type?: string;

}

export class PaginationOptions implements PaginationOptionsInterface {
  previousPageIndex: number;
  pageIndex: number;
  pageSize: number;
  length: number;
  search?: string;
  sort?: sort;
  orderBy?: string;
  constructor() {
   this.previousPageIndex = 0;
      this.pageIndex = 0;
      this.pageSize = 10;
      this.length = 0;
  }
}
