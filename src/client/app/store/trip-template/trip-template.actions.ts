import {Event, TripTemplate, TripTemplateWithMetadata} from '../../shared/models/TripTemplate';
import {Action} from '@ngrx/store';
import {PaginationOptionsInterface} from '../../shared/common-list/common-list-item/pagination-options.interface';

export enum TripTemplateActionTypes {
  GET_TRIP_TEMPLATES = '[T.Template] Retrieving',
  TRIP_TEMPLATES_RETRIEVED = '[T.Template] Retrieved Succesfully',
  TRIP_TEMPLATE_SELECTED = '[T.Template] Selected',
  CREATE_TRIP_TEMPLATE = '[T.Template] Posting',
  SAVE_TRIP_TEMPLATE = '[T.Template] Updating',
  GET_EVENTS_FOR_T_TEMPLATE = '[Events] Retrieving',
  EVENTS_RETRIEVED_FOR_TEMPLATE = '[Events] Retrieved Succesfully',
  EVENT_SELECTED = '[Events] Selected',
  ADD_EVENT = '[Events] Adding new Event',
  SELECT_ORDINAL_TO_ADD_EVENT = '[Events] Selecting Ordinal'

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

export type TripTemplateActions = GetTripTemplates | CreateTripTemplate |
  TripTemplatesRetrieved | GetEventsForTripTemplate | EventsRetrieved |
  EventSelected | AddEvent | SaveTripTemplate | OrdinalForEventSetted |
  TripTemplateSelected;
