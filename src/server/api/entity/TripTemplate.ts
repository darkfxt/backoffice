
export enum event_type {
  'HOTEL',
  'SEGMENT',
  'ACTIVITY',
  'CUSTOM'
}

export class Event {

  constructor( public _id: string, public name: string,
               public ordinal: number, public time: Date, public eventType: event_type,
               public description?: string, public reference_id?: string
               ) {
    this._id = _id;
    this.name = name;
    this.ordinal = ordinal;
    this.time = time;
    this.eventType = eventType;
    if(description) this.description = description;
    if(reference_id) this.reference_id = reference_id;

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
