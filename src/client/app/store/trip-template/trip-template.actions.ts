import {Event, TripTemplate, TripTemplateWithMetadata, eventType} from '../../shared/models/TripTemplate';
import {Action} from '@ngrx/store';
import {PaginationOptionsInterface} from '../../shared/common-list/common-list-item/pagination-options.interface';

export enum TripTemplateActionTypes {
  GET_TRIP_TEMPLATES = '[T.Template] Retrieving',
  TRIP_TEMPLATES_RETRIEVED = '[T.Template] Retrieved Succesfully',
  TRIP_TEMPLATE_SELECTED = '[T.Template] Selected',
  CREATE_TRIP_TEMPLATE = '[T.Template] Posting',
  SAVE_TRIP_TEMPLATE = '[T.Template] Updating',
  TRIP_TEMPLATE_PROCESSED_SUCCESFULLY = '[T.Template] Processed Succesfully',
  TRIP_TEMPLATE_LEAVE_EDITION = '[T.Template] Leaving template edition',
  GET_EVENTS_FOR_T_TEMPLATE = '[Events] Retrieving',
  EVENTS_RETRIEVED_FOR_TEMPLATE = '[Events] Retrieved Succesfully',
  EVENT_SELECTED = '[Events] Selected',
  ADD_EVENT = '[Events] Adding new Event',
  SELECT_ORDINAL_TO_ADD_EVENT = '[Events] Selecting ordinal Index',
  SELECT_DAY_TO_ADD_EVENT = '[Events] Selecting ordinal day',
  SELECT_TYPE_TO_ADD_EVENT = '[Events] Selecting event type',
  SELECT_EVENT_TYPE_DAY_ORDINAL = '[Events] Setting Type, index & day for event'
}

export class GetTripTemplates implements Action {
  readonly type = TripTemplateActionTypes.GET_TRIP_TEMPLATES;
  constructor (readonly payload: PaginationOptionsInterface){
    this.payload = payload;
  }
}

export class CreateTripTemplate implements Action {
  readonly type = TripTemplateActionTypes.CREATE_TRIP_TEMPLATE;
  constructor (readonly payload: TripTemplate){
    this.payload = payload;
  }
}

export class SaveTripTemplate implements Action {
  readonly type = TripTemplateActionTypes.SAVE_TRIP_TEMPLATE;
  constructor (readonly payload: TripTemplate){
    this.payload = payload;
  }
}

export class TripTemplateSelected implements Action {
  readonly type = TripTemplateActionTypes.TRIP_TEMPLATE_SELECTED;
  constructor (readonly payload: TripTemplate){
    this.payload = payload;
  }
}

export class TripTemplateEditionLeft implements Action {
  readonly type = TripTemplateActionTypes.TRIP_TEMPLATE_LEAVE_EDITION;
  constructor (readonly payload: string){
    this.payload = payload;
  }
}

export class TripTemplateProcessedSuccesfully implements Action {
  readonly type = TripTemplateActionTypes.TRIP_TEMPLATE_PROCESSED_SUCCESFULLY;
  constructor (readonly payload: TripTemplate){
    this.payload = payload;
  }
}

export class TripTemplatesRetrieved implements Action {
  readonly type = TripTemplateActionTypes.TRIP_TEMPLATES_RETRIEVED;
  readonly payload: TripTemplate[];
  readonly metadata: PaginationOptionsInterface;
  constructor (readonly  response: TripTemplateWithMetadata) {
    this.payload = response.data;
    this.metadata = response.metadata;
  }
}

export class GetEventsForTripTemplate implements Action {
  readonly type = TripTemplateActionTypes.GET_EVENTS_FOR_T_TEMPLATE;
  constructor (readonly payload: string){
    this.payload = payload;
  }
}

export class EventsRetrieved implements Action {
  readonly type = TripTemplateActionTypes.EVENTS_RETRIEVED_FOR_TEMPLATE;
  readonly payload: Event[];
  constructor (readonly response: Event[]) {
    this.payload = response;
  }
}

export class AddEvent implements Action {
  readonly type = TripTemplateActionTypes.ADD_EVENT;
  constructor (readonly payload: Event) {
    this.payload = payload;
  }
}

export class EventSelected implements Action {
  readonly type = TripTemplateActionTypes.EVENT_SELECTED;
  constructor (readonly payload: any){
    this.payload = payload;
  }
}

export class OrdinalForEventSetted implements Action {
  readonly type = TripTemplateActionTypes.SELECT_ORDINAL_TO_ADD_EVENT;
  constructor (readonly payload: number){
    this.payload = payload;
  }
}

export class OrdinalDayForEventSetted implements Action {
  readonly type = TripTemplateActionTypes.SELECT_DAY_TO_ADD_EVENT;
  constructor (readonly payload: number){
    this.payload = payload;
  }
}

export class DayIndexTypeForEventSetted implements Action {
  readonly type = TripTemplateActionTypes.SELECT_EVENT_TYPE_DAY_ORDINAL;
  public payload: dayIndexType;
  constructor ( day: number,  index: number,  type: eventType){
    this.payload = {day, index, type};
  }
}

interface dayIndexType {
  day: number;
  index: number;
  type: eventType;
}

export type TripTemplateActions = GetTripTemplates | CreateTripTemplate |
  TripTemplatesRetrieved | GetEventsForTripTemplate | EventsRetrieved |
  EventSelected | AddEvent | SaveTripTemplate | OrdinalForEventSetted |
  TripTemplateSelected | TripTemplateProcessedSuccesfully | TripTemplateEditionLeft |
  OrdinalDayForEventSetted | DayIndexTypeForEventSetted;