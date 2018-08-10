import {PaginationOptionsInterface} from '../common-list/common-list-item/pagination-options.interface';

enum eventType {
  'HOTEL',
  'SEGMENT',
  'ACTIVITY',
  'CUSTOM'
}

export class Event {

  _id: string;
  name: string;
  ordinal: number;
  time: Date;
  description: string;
  reference_id: string;
  event_type: eventType;
  created_by: string;
}

export class TripTemplate {

  _id: string;
  name: string;
  events: Event[];
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
