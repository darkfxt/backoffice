import { Event, TripTemplate, TripTemplateWithMetadata, TypeOfEvent, DayOfTrip } from '../../shared/models/TripTemplate';
import { Action } from '@ngrx/store';
import { PaginationOptionsInterface } from '../../shared/common-list/common-list-item/pagination-options.interface';
import { Update } from '@ngrx/entity';

export enum TripTemplateActionTypes {
  GET_TRIP_TEMPLATES = '[T.Template] Retrieving',
  TRIP_TEMPLATES_RETRIEVED = '[T.Template] Retrieved Succesfully',
  TRIP_TEMPLATES_METADATA_RETRIEVED = '[T.Template] Retrieved Metadata',
  TRIP_TEMPLATE_SELECTED = '[T.Template] Selected',
  CREATE_TRIP_TEMPLATE = '[T.Template] Posting',
  UPDATE_TRIP_TEMPLATE = '[T.Template] Updating Template',
  SAVE_TRIP_TEMPLATE = '[T.Template] Updating',
  TRIP_TEMPLATE_PROCESSED_SUCCESFULLY = '[T.Template] Processed Succesfully',
  TRIP_TEMPLATE_LEAVE_EDITION = '[T.Template] Leaving template edition',
  SET_NAME_FOR_TEMPLATE = '[Events] Set username',
  SET_DESCRIPTION_FOR_TEMPLATE = '[Events] Set description',
  ADD_DAY_TO_SELECTED_TEMPLATE = '[T.Template] Add a new Day to selected Template',
  UPDATE_DAY_ON_SELECTED_TEMPLATE = '[T.Template] Updating day on Template',
  IMPORT_TRIP_TEMPLATE = '[T.Template] Importing Trip Template',
  FILL_ITINERARY = '[T.Template] Fill itinerary with booking data'
}

export class GetTripTemplates implements Action {
  readonly type = TripTemplateActionTypes.GET_TRIP_TEMPLATES;
  constructor (readonly payload: PaginationOptionsInterface) {
    this.payload = payload;
  }
}

export class CreateTripTemplate implements Action {
  readonly type = TripTemplateActionTypes.CREATE_TRIP_TEMPLATE;
  constructor (readonly payload: {tripTemplate: TripTemplate}) { }
}

export class SaveTripTemplate implements Action {
  readonly type = TripTemplateActionTypes.SAVE_TRIP_TEMPLATE;
  constructor (readonly payload: TripTemplate) {
    this.payload = payload;
  }
}

export class TripTemplateSelected implements Action {
  readonly type = TripTemplateActionTypes.TRIP_TEMPLATE_SELECTED;
  constructor (readonly payload: string | null) {
    this.payload = payload;
  }
}

export class TripTemplateEditionLeft implements Action {
  readonly type = TripTemplateActionTypes.TRIP_TEMPLATE_LEAVE_EDITION;
  constructor (readonly payload: string) {
    this.payload = payload;
  }
}

export class TripTemplateProcessedSuccesfully implements Action {
  readonly type = TripTemplateActionTypes.TRIP_TEMPLATE_PROCESSED_SUCCESFULLY;
  constructor (readonly payload: TripTemplate) {
    this.payload = payload;
  }
}

export class TripTemplatesRetrieved implements Action {
  readonly type = TripTemplateActionTypes.TRIP_TEMPLATES_RETRIEVED;
  constructor (public payload: TripTemplate[]) { }
}

export class TripTemplatesMetadataRetrieved implements Action {
  readonly type = TripTemplateActionTypes.TRIP_TEMPLATES_METADATA_RETRIEVED;
  constructor(public payload: PaginationOptionsInterface) { }
}

export class SetNameForTemplate implements Action {
  readonly type = TripTemplateActionTypes.SET_NAME_FOR_TEMPLATE;
  constructor (readonly payload: string) {
    this.payload = payload;
  }
}

export class SetDescriptionForTemplate implements Action {
  readonly type = TripTemplateActionTypes.SET_DESCRIPTION_FOR_TEMPLATE;
  constructor (readonly payload: string) {
    this.payload = payload;
  }
}

export class AddDayToSelectedTemplate implements Action {
  readonly type = TripTemplateActionTypes.ADD_DAY_TO_SELECTED_TEMPLATE;
  constructor (readonly payload: DayOfTrip) {
    this.payload = payload;
  }
}

export class UpdateDayOnSelectedTemplate implements Action {
  readonly type = TripTemplateActionTypes.UPDATE_DAY_ON_SELECTED_TEMPLATE;
  constructor (readonly payload: any) { }
}

export class UpdateTripTemplate implements Action {
  readonly type = TripTemplateActionTypes.UPDATE_TRIP_TEMPLATE;
  constructor (readonly payload: {tripTemplate: TripTemplate}) { }
}

export class ImportTripTemplate implements Action {
  readonly type = TripTemplateActionTypes.IMPORT_TRIP_TEMPLATE;
  constructor (readonly payload: {tripTemplateId: string}) { }
}

export class FillItinerary implements Action {
  readonly type = TripTemplateActionTypes.FILL_ITINERARY;
  constructor (readonly payload: {days: Array<DayOfTrip>}) { }
}

export type showLoaderTypes = GetTripTemplates | CreateTripTemplate | SaveTripTemplate;
export const showLoaderActions = [
  TripTemplateActionTypes.GET_TRIP_TEMPLATES,
  TripTemplateActionTypes.CREATE_TRIP_TEMPLATE,
  TripTemplateActionTypes.SAVE_TRIP_TEMPLATE,
];
export type hideLoaderTypes = TripTemplatesRetrieved |
  TripTemplateSelected | TripTemplateProcessedSuccesfully | TripTemplateEditionLeft ;
export const hideLoaderActions = [
  TripTemplateActionTypes.TRIP_TEMPLATES_RETRIEVED,
  TripTemplateActionTypes.TRIP_TEMPLATE_SELECTED,
  TripTemplateActionTypes.TRIP_TEMPLATE_PROCESSED_SUCCESFULLY,
  TripTemplateActionTypes.TRIP_TEMPLATE_LEAVE_EDITION
];
interface dayIndexType {
  day: number;
  index: number;
  type: TypeOfEvent;
}

export type TripTemplateActions = GetTripTemplates | CreateTripTemplate | UpdateDayOnSelectedTemplate |
  TripTemplatesRetrieved | SaveTripTemplate | TripTemplateSelected | ImportTripTemplate | FillItinerary |
  TripTemplateProcessedSuccesfully | TripTemplateEditionLeft | AddDayToSelectedTemplate |
  SetNameForTemplate | SetDescriptionForTemplate | TripTemplatesMetadataRetrieved | UpdateTripTemplate;
