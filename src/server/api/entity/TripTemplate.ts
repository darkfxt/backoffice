export enum event_type {
  HOTEL = 'HOTEL',
  DRIVING = 'DRIVING',
  ACTIVITY = 'ACTIVITY',
  OTHER = 'OTHER'
}

export class Event {

  constructor( public _id: string, public name: string,
               public ordinal: number, public time: Date, public event_type: event_type, // tslint:disable-line
               public description?: string, public reference_id?: string, public referencedObject?: any, public index?: number,
               public geo?: any
               ) {
    this._id = _id;
    this.name = name;
    this.ordinal = ordinal;
    this.time = time;
    this.event_type = event_type;
    if (description) this.description = description;
    if (reference_id) this.reference_id = reference_id;
    if (index) this.index = index;
    if (geo) this.geo = geo;
    if (referencedObject) this.referencedObject = referencedObject;

  }

  created_by: string;
}

export class DayOfTrip {
  constructor(public events: Event[]) {
    this.events = events;
  }
}

export class TripTemplate {

  created_by: string;
  constructor(public _id: string, public name: string, public days: DayOfTrip[]) {
    this._id = _id;
    this.name = name;
    this.days = days;
  }
}

export class TripTemplateEmpty {
  created_by: string;
  name: string;
  days: DayOfTrip[];
  constructor() {
    this.days = [new DayOfTrip([EventEmpty])];
  }
}

export const EventEmpty: Event = new Event(null, null, null, null, null);
