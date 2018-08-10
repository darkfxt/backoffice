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

}
