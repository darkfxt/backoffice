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
  types?: Array<string>;
  self?: boolean;
  coordinates?: any;
  origin?: any;
  destination?: any;
  middle_points?: any;
  travelMode?: any;
  distance?: number;
}

export class PaginationOptions implements PaginationOptionsInterface {
  previousPageIndex: number;
  pageIndex: number;
  pageSize: number;
  length: number;
  search?: string;
  sort?: sort;
  orderBy?: string;
  types?: Array<string>;
  self?: boolean;
  coordinates?: any;
  origin?: any;
  destination?: any;
  middle_points?: any;
  travelMode?: any;
  distance?: number;
  constructor() {
   this.previousPageIndex = 0;
      this.pageIndex = 0;
      this.pageSize = 10;
      this.length = 0;
      this.search = '';
      this.types = [];
  }
}
