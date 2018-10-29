import { PaginationOptionsInterface } from '../common-list/common-list-item/pagination-options.interface';
import Segment from './Segment';
import { Point } from './Place';

export enum TypeOfEvent {
  POI = 'POI',
  HOTEL = 'HOTEL',
  ACTIVITY = 'ACTIVITY',
  DESTINATION = 'DESTINATION',
  REFERENCE = 'REFERENCE',
  TERMINAL = 'TERMINAL',
  DRIVING = 'DRIVING',
  OTHER = 'OTHER'
}

export const iconMap = {
  'ACTIVITY': 'local_activity',
  'HOTEL': 'hotel',
  'POI': 'local_see',
  'DESTINATION': 'place',
  'REFERENCE': 'place',
  'TERMINAL': 'trip_origin',
  'DRIVING': 'directions_car',
  'OTHER': 'not_listed_location'
};

export enum terminalType {
  ORIGIN = 'origin',
  DESTINATION = 'destination'
}

const colors = [
  '#ba68c8',
  '#f06292',
  '#7986cb',
  '#4db6ac',
  '#ff8a65',
  '#90a4ae',
  '#f06292'
];

/**
 * Event types that works as terminal
 */
const terminalTypes = [
  TypeOfEvent.TERMINAL,
  TypeOfEvent.HOTEL
];

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
  color: string;

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
        if (product.origin !== null && terminalTypes.indexOf(product.origin.type) === -1) {
          productToAdd.referencedOrigin = product.origin;
          productToAdd.origin = null;
        }
        if (product.destination !== null && terminalTypes.indexOf(product.destination.type) === -1) {
          productToAdd.referencedDestination = product.destination;
          productToAdd.destination = null;
        }
      }
      this.product = productToAdd;
    }
    this.color = colors[Math.floor(Math.random() * colors.length)];
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
