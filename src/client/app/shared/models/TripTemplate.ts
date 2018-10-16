import { PaginationOptionsInterface } from '../common-list/common-list-item/pagination-options.interface';

export enum eventType {
  HOTEL = 'HOTEL',
  DRIVING = 'DRIVING',
  ACTIVITY = 'ACTIVITY',
  OTHER = 'OTHER'
}

export class Event {

  _id: string;
  name: string;
  ordinal: number;
  index: number;
  time: Date;
  description: string;
  reference_id: string;
  event_type: string;
  geo?: any;
  referencedObject?: any;
  created_by: string;
}

export class DayOfTrip {
  events: Event[];
}

export class TripTemplate {

  _id: string;
  name: string;
  days: DayOfTrip[];
  description: string;
  created_by: string;
}

export class TripTemplateWithMetadata {
  data: TripTemplate[];
  metadata: PaginationOptionsInterface;
  constructor(tripTemplate: TripTemplate[], metadata: PaginationOptionsInterface) {
    this.data = tripTemplate;
    this.metadata = metadata;
  }
}
