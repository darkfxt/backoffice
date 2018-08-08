import {PaginationOptionsInterface} from '../common-list/common-list-item/pagination-options.interface';

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
