export enum event_type {
  HOTEL = 'HOTEL',
  DRIVING = 'DRIVING',
  ACTIVITY = 'ACTIVITY',
  OTHER = 'OTHER'
}

export class Event {

  constructor( public _id: string, public name: string,
               public ordinal: number, public time: Date, public eventType: event_type,
               public description?: string, public reference_id?: string, public index?: number,
               public geo?: any
               ) {
    this._id = _id;
    this.name = name;
    this.ordinal = ordinal;
    this.time = time;
    this.eventType = eventType;
    if(description) this.description = description;
    if(reference_id) this.reference_id = reference_id;
    if(index) this.index = index;
    if(geo) this.geo = geo;

  }

  created_by: string;
}

export class TripTemplate {

  created_by: string;
  constructor(public _id: string, public name: string, public events: Event[]) {
    this._id = _id;
    this.name = name;
    this.events = events;
  }
}

export class TripTemplateEmpty {
  created_by: string;
  name: string;
  events: Event[] = [];
  constructor() {
  }
}
