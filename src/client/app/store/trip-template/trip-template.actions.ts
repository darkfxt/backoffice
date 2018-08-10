import {Event, TripTemplate, TripTemplateWithMetadata} from '../../shared/models/TripTemplate';
import {Action} from '@ngrx/store';
import {PaginationOptionsInterface} from '../../shared/common-list/common-list-item/pagination-options.interface';

export enum TripTemplateActionTypes {
  GET_TRIP_TEMPLATES = '[T.Template] Retrieving',
  TRIP_TEMPLATES_RETRIEVED = '[T.Template] Retrieved Succesfully',
  GET_EVENTS_FOR_T_TEMPLATE = '[Events] Retrieving',
  EVENTS_RETRIEVED_FOR_TEMPLATE = '[Events] Retrieved Succesfully'
}

export class GetTripTemplates implements Action {
  readonly type = TripTemplateActionTypes.GET_TRIP_TEMPLATES;
  constructor (readonly payload: PaginationOptionsInterface){
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
  constructor (readonly payload: PaginationOptionsInterface, readonly tripTemplateId: string){
    this.payload = payload;
    this.tripTemplateId = tripTemplateId;
  }
}

export class EventsRetrieved implements Action {
  readonly type = TripTemplateActionTypes.EVENTS_RETRIEVED_FOR_TEMPLATE;
  readonly payload: Event[];
  constructor (readonly  response: Event[]) {
    this.payload = response;
  }
}

export type TripTemplateActions = GetTripTemplates | TripTemplatesRetrieved | GetEventsForTripTemplate | EventsRetrieved;
