import { PaginationOptionsInterface } from '../common-list/common-list-item/pagination-options.interface';
import Segment from './Segment';
import { Point } from './Place';

export enum TypeOfEvent {
  HOTEL = 'HOTEL',
  DRIVING = 'DRIVING',
  ACTIVITY = 'ACTIVITY',
  OTHER = 'OTHER'
}

export enum terminalType {
  ORIGIN = 'origin',
  DESTINATION = 'destination'
}

export class Event {

  _id: string;
  name: string;
  description: string;
  eventType: string;
  time: Date;
  order: number;
  created_by: string;
  dayId?: string;
  product?: any;
  constructor(name: string, description: string, eventType: TypeOfEvent,
              order: number, dayId?: string, product?: any, id?: string, time?: Date) {
    this.name = name;
    this.description = description;
    this.eventType = eventType;
    this.order = order;
    if (id)
      this._id = id;
    else
      this._id = new Date().getUTCMilliseconds().toString();
    if (dayId) this.dayId = dayId;
    if (time) this.time = time;
    if (product) {
      const productToAdd = Object.assign({}, product);
      if (eventType === 'DRIVING') {
        if (product.origin !== null && product.origin.type === 'REFERENCE') {
          productToAdd.referencedOrigin = product.origin;
          productToAdd.origin = null;
        }
        if (product.destination !== null && product.destination.type === 'REFERENCE') {
          productToAdd.referencedDestination = product.destination;
          productToAdd.destination = null;
        }
      }
      this.product = productToAdd;
    }
  }
}

export class DayOfTrip {
  _id: string;
  events: Array<Event>;
  constructor(events: Array<Event>, id?: string) {
    if (id)
      this._id = id;
    else
      this._id = new Date().getUTCMilliseconds().toString();
    this.events = events;
  }
}

export class TripTemplate {

  _id: string;
  name: string;
  days: DayOfTrip[];
  description: string;
  created_by: string;
  company_id: number;
}

export class TripTemplateWithMetadata {
  data: TripTemplate[];
  metadata: PaginationOptionsInterface;
  constructor(tripTemplate: TripTemplate[], metadata: PaginationOptionsInterface) {
    this.data = tripTemplate;
    this.metadata = metadata;
  }
}
