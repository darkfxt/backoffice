import { PaginationOptionsInterface } from '../common-list/common-list-item/pagination-options.interface';

export enum TypeOfEvent {
  POI = 'point_of_interest',
  HOTEL = 'hotel',
  ACTIVITY = 'activity',
  DESTINATION = 'destination',
  TERMINAL = 'terminal',
  DRIVING = 'driving',
  CUSTOM = 'custom'
}

export const iconMap = {
  'activity': 'local_activity',
  'hotel': 'hotel',
  'point_of_interest': 'local_see',
  'destination': 'place',
  'terminal': 'trip_origin',
  'driving': 'directions_car',
  'custom': 'not_listed_location'
};

export enum terminalType {
  ORIGIN = 'origin',
  DESTINATION = 'destination'
}

export const eventColors = {
  'activity': '#4db6ac',
  'hotel': '#7986cb',
  'point_of_interest': '#ff8a65',
  'destination': '#f06292',
  'terminal': '#ba68c8',
  'driving': '#42a5f5',
  'walking': '#42a5f5',
  'bicycling': '#42a5f5',
  'custom': '#90a4ae'
};

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
  event_type: string;
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
    this.event_type = eventType;
    this.order = order;
    if (id)
      this._id = id;
    else
      this._id = new Date().getUTCMilliseconds().toString();
    if (dayId) this.dayId = dayId;
    if (time) this.time = time;
    if (product) {
      const productToAdd = Object.assign({}, product);
      if (eventType === TypeOfEvent.DRIVING) {
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
