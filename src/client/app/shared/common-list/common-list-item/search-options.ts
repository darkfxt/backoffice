import { PaginationOptionsInterface } from './pagination-options.interface';

enum sort {
  'ASC' = 1,
  'DES' = -1
}

export class SearchOptions implements PaginationOptionsInterface {
  previousPageIndex: number;
  pageIndex: number;
  pageSize: number;
  length: number;
  search?: string;
  sort?: sort;
  orderBy?: string;

  constructor(page: number, limit: number, totalItems: number, order: sort = sort.ASC, search?: string) {
    this.previousPageIndex = page && page <= 1 ? 0 : page - 1;
    this.pageIndex = page;
    this.pageSize = limit;
    this.length = totalItems;
    this.sort = order;
    if (search) this.search = search;
  }

}
