import { PaginationOptionsInterface } from '../common-list/common-list-item/pagination-options.interface';

export class Leg {
  distance: any;
  duration: any;
}

export class ThingToKnow {
  title: string;
  description: string;

}

export class Point {
  lat: number;
  lng: number;
}

export default class Segment {
  _id: string;
  name: string;
  search_name: string;
  route_type: string;
  road_surface: string;
  via: string;
  description: string;
  images: any[];
  origin: Point;
  destination: Point;
  middle_points: Point[];
  things_to_know: ThingToKnow[];
  legs: Leg[];

  constructor(params: any = {}) {
    this._id = params._id || '';
    this.name = params.name || '';
    this.route_type = params.route_type || '';
    this.search_name = params.search_name || '';
    this.road_surface = params.road_surface || '';
    this.images = params.images || [];
    this.description = params.description || '';
    this.origin = params.origin || '';
    this.destination = params.destination || '';
    this.middle_points = params.middle_points || [];
    this.things_to_know = params.things_to_know || [];
    this.legs = params.legs || [];
  }
}

export class SegmentWithMetadata {
  data: Segment[];
  metadata: PaginationOptionsInterface;
  constructor(segments: Segment[], metadata: PaginationOptionsInterface) {
    this.data = segments;
    this.metadata = metadata;
  }
}
