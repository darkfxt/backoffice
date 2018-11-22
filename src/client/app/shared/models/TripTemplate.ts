import { PaginationOptionsInterface } from '../common-list/common-list-item/pagination-options.interface';

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

export const eventColors = {
  'ACTIVITY': '#4db6ac',
  'HOTEL': '#7986cb',
  'POI': '#ff8a65',
  'DESTINATION': '#f06292',
  'REFERENCE': '#f06292',
  'TERMINAL': '#ba68c8',
  'DRIVING': '#42a5f5',
  'OTHER': '#90a4ae'
};

/**
 * Event types that works as terminal
 */
const terminalTypes = [
  TypeOfEvent.TERMINAL,
  TypeOfEvent.HOTEL,
  TypeOfEvent.POI
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
        if (product.origin !== null && !terminalTypes.includes(product.origin.type)) {
          productToAdd.referencedOrigin = product.origin;
          productToAdd.origin = null;
        }
        if (product.destination !== null && !terminalTypes.includes(product.destination.type)) {
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
  public days: DayOfTrip[];
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
