import {DayOfTrip, Event, terminalType, TypeOfEvent} from '../../../shared/models/TripTemplate';
import { Action } from '@ngrx/store';

export enum EventActionTypes {
  GET_EVENTS = '[Events] Retrieving',
  EVENTS_RETRIEVED = '[Events] Retrieved Succesfully',
  EVENT_SELECTED = '[Events] Selected',
  ADD_EVENT = '[Events] Adding new Event',
  REMOVE_EVENT = '[Events] Removing Event',
  UPDATE_EVENT = '[Events] Updating Event',
  SELECT_TERMINAL = '[Events] Terminal selected',
  CLEAR_EVENT = '[Events] Clear event data',
  SELECT_ORDINAL_TO_ADD_EVENT = '[Events] Selecting ordinal Index',
  DRIVING_EVENT_SELECTED = '[Events] Selected driving for update',
  SET_NAME_FOR_TEMPLATE = '[Events] Set username',
  SET_DESCRIPTION_FOR_TEMPLATE = '[Events] Set description',
  SELECT_EVENT_TYPE_DAY_ORDINAL = '[Events] Setting Type, index & day for event'
}

export class GetEventsForTripTemplate implements Action {
  readonly type = EventActionTypes.GET_EVENTS;
  constructor (readonly payload: string) {
    this.payload = payload;
  }
}

export class EventsRetrieved implements Action {
  readonly type = EventActionTypes.EVENTS_RETRIEVED;
  constructor (public payload: Array<Event>) { }
}

export class AddEvent implements Action {
  readonly type = EventActionTypes.ADD_EVENT;
  constructor (readonly payload: {event: Event, day: string}) {
    this.payload = payload;
  }
}

export class RemoveEvent implements Action {
  readonly type = EventActionTypes.REMOVE_EVENT;
  constructor (readonly payload: {_id: string, dayId: string}) {
    this.payload = payload;
  }
}

export class UpdateEvent implements Action {
  readonly type = EventActionTypes.UPDATE_EVENT;
  constructor (readonly payload: Event) { }
}

export class ClearEvents implements Action {
  readonly type = EventActionTypes.CLEAR_EVENT;
  constructor () { }
}

export class EventSelected implements Action {
  readonly type = EventActionTypes.EVENT_SELECTED;
  constructor (readonly payload: {_id: string, type: string}) {
    this.payload = payload;
  }
}

export class TerminalSelected implements Action {
  readonly type = EventActionTypes.SELECT_TERMINAL;
  constructor (readonly payload: {terminal: any}) { }
}

export class DrivingEventSelected implements Action {
  readonly type = EventActionTypes.DRIVING_EVENT_SELECTED;
  constructor (readonly payload: {event: Event, terminal: string}) { }
}

export class OrdinalForEventSetted implements Action {
  readonly type = EventActionTypes.SELECT_ORDINAL_TO_ADD_EVENT;
  constructor (readonly payload: number) {
    this.payload = payload;
  }
}

export class SetNameForTemplate implements Action {
  readonly type = EventActionTypes.SET_NAME_FOR_TEMPLATE;
  constructor (readonly payload: string) {
    this.payload = payload;
  }
}

export class SetDescriptionForTemplate implements Action {
  readonly type = EventActionTypes.SET_DESCRIPTION_FOR_TEMPLATE;
  constructor (readonly payload: string) {
    this.payload = payload;
  }
}

export class DayIndexTypeForEventSetted implements Action {
  readonly type = EventActionTypes.SELECT_EVENT_TYPE_DAY_ORDINAL;
  public payload: dayIndexType;
  constructor ( day: number,  index: number,  type: TypeOfEvent) {
    this.payload = {day, index, type};
  }
}

export type showLoaderTypes = GetEventsForTripTemplate | AddEvent ;
export const showLoaderActions = [
  EventActionTypes.GET_EVENTS,
  EventActionTypes.ADD_EVENT,
];
export type hideLoaderTypes = EventsRetrieved | EventSelected ;
export const hideLoaderActions = [
  EventActionTypes.EVENTS_RETRIEVED,
  EventActionTypes.EVENT_SELECTED,
];
interface dayIndexType {
  day: number;
  index: number;
  type: TypeOfEvent;
}

export type EventActions = GetEventsForTripTemplate | EventsRetrieved | TerminalSelected |
  EventSelected | AddEvent | OrdinalForEventSetted | SetNameForTemplate | DayIndexTypeForEventSetted |
  SetDescriptionForTemplate | RemoveEvent | UpdateEvent | DrivingEventSelected | ClearEvents;
