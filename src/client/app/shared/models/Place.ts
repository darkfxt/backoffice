import { PaginationOptionsInterface } from '../common-list/common-list-item/pagination-options.interface';
import { PlaceType } from './enum/PlaceType';

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
  geo: Coordinates;
  images: Array<any>;
  type: PlaceType;
  search_name: string;
  status: ActiveStatus;
}

interface Coordinates {
  lat: number;
  lng: number;
}

enum ActiveStatus {
  'ACTIVE',
  'INACTIVE'
}
