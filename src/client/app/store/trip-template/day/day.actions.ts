import { DayOfTrip, Event } from '../../../shared/models/TripTemplate';
import { Action } from '@ngrx/store';
import {Update} from '@ngrx/entity';

export enum DayActionTypes {
  GET_DAYS = '[Days] Retrieving',
  DAYS_RETRIEVED = '[Days] Retrieved Succesfully',
  DAY_SELECTED = '[Days] Selected',
  ADD_DAY = '[Days] Adding new Day',
  REMOVE_DAY = '[Days] Removing Day',
  SELECT_ORDINAL_TO_ADD_DAY = '[Days] Selecting ordinal Index',
  UPDATE_DAY = '[Days] Adding Event'
}

export class GetDaysForTripTemplate implements Action {
  readonly type = DayActionTypes.GET_DAYS;
  constructor (readonly payload: string) {
    this.payload = payload;
  }
}

export class DaysRetrieved implements Action {
  readonly type = DayActionTypes.DAYS_RETRIEVED;
  constructor (public payload: Array<DayOfTrip>) { }
}

export class AddDay implements Action {
  readonly type = DayActionTypes.ADD_DAY;
  constructor (readonly payload?: DayOfTrip) {
    this.payload = payload;
  }
}

export class RemoveDay implements Action {
  readonly type = DayActionTypes.REMOVE_DAY;
  constructor (readonly payload: {_id: number}) {
    this.payload = payload;
  }
}

export class DaySelected implements Action {
  readonly type = DayActionTypes.DAY_SELECTED;
  constructor (readonly payload: string | null) {
    this.payload = payload;
  }
}

export class OrdinalForDaySetted implements Action {
  readonly type = DayActionTypes.SELECT_ORDINAL_TO_ADD_DAY;
  constructor (readonly payload: number) {
    this.payload = payload;
  }
}

export class UpdateDay implements Action {
  readonly type = DayActionTypes.UPDATE_DAY;
  constructor(public payload: DayOfTrip) { }
}

export type showLoaderTypes = GetDaysForTripTemplate | AddDay ;
export const showLoaderActions = [
  DayActionTypes.GET_DAYS,
  DayActionTypes.ADD_DAY,
];
export type hideLoaderTypes = DaysRetrieved | DaySelected ;
export const hideLoaderActions = [
  DayActionTypes.DAYS_RETRIEVED,
  DayActionTypes.DAY_SELECTED,
];

export type DayActions = GetDaysForTripTemplate | DaysRetrieved |
  DaySelected | AddDay | OrdinalForDaySetted | RemoveDay | UpdateDay;
