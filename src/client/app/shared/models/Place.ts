import { PaginationOptionsInterface } from '../common-list/common-list-item/pagination-options.interface';
import { PlaceType } from './enum/PlaceType';
import { Geo } from './Geo';

export class Point {

  constructor(
    public  _id: string = '',
    public name: string = '',
    public description: string = '',
    public location: any = '',
    public place_id: string = ''
  ) {}

}

export class PointWithMetadata {
  data: Point[];
  metadata: PaginationOptionsInterface;
  constructor(points: Point[], metadata: PaginationOptionsInterface) {
    this.data = points;
    this.metadata = metadata;
  }
}


export class Place {
  _id: string;
  name: string;
  company_id: number;
  created_by: string;
  description: string;
  geo: Geo;
  images: Array<any>;
  type: PlaceType;
  search_name: string;
  status: ActiveStatus;
  default_lang: string;
  constructor(params: any = {}) {
    this._id = params._id;
    this.name = params.name || '';
    this.search_name = params.search_name || '';
    this.description = params.description || '';
    this.type = params.type || '';
    this.status = params.status || 1;
    this.geo = params.geo || new Geo();
    this.images = params.images || [];
    this.created_by = params.created_by || '';
  }
}

enum ActiveStatus {
  'ACTIVE',
  'INACTIVE'
}


