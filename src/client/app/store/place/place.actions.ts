import { Action } from '@ngrx/store';

import { Point, PointWithMetadata } from '../../shared/models/Place';
import { PaginationOptionsInterface } from '../../shared/common-list/common-list-item/pagination-options.interface';
import { DialogActions } from '../dialog-actions.enum';

export enum PointActionTypes {
  GET_POINTS = '[Point] Retrieving',
  FILTER_POINTS = '[Point] Filtering',
  POINTS_RETRIEVED = '[Point] Retrieved Succesfully',
  POINTS_METADATA_RETRIEVED = '[Point] Metadata Retrieved',
  SAVE_POINT = '[Point] Adding Point',
  POINT_SELECTED = '[Point] Selected',
  CLEAR_POINT = '[Point] Clear',
  TOGGLE_DIALOG = '[Point] Setting Point Dialog'
}

export class GetPoints implements Action {
  readonly type = PointActionTypes.GET_POINTS;
  constructor(readonly payload: PaginationOptionsInterface) {
    this.payload = payload;
  }
}

export class PointSelected implements Action {
  readonly type = PointActionTypes.POINT_SELECTED;
  constructor(readonly payload: Point) {
    this.payload = payload;
  }
}

export class PointMetadataRetrieved implements Action {
  readonly type = PointActionTypes.POINTS_METADATA_RETRIEVED;
  constructor(public payload: PaginationOptionsInterface) { }
}

export class FilterPoints implements Action {
  readonly type = PointActionTypes.FILTER_POINTS;
  constructor(readonly payload: PaginationOptionsInterface) {
    this.payload = payload;
  }
}

export class PointsRetrieved implements Action {
  readonly type = PointActionTypes.POINTS_RETRIEVED;
  constructor(public payload: Array<Point>) { }
}

export class SavePoint implements Action {
  readonly type = PointActionTypes.SAVE_POINT;
  constructor(readonly payload: any) {
    this.payload = payload;
  }
}

export class ClearPoint implements Action {
  readonly type = PointActionTypes.CLEAR_POINT;
  constructor() {
  }
}

export class ToggleDialogPoint implements Action {
  readonly type = PointActionTypes.TOGGLE_DIALOG;
  constructor(readonly payload: DialogActions = DialogActions.FALSE) {
    this.payload = payload;
  }
}

export type showLoaderTypes = GetPoints | SavePoint | FilterPoints;
export const showLoaderActions = [
  PointActionTypes.GET_POINTS,
  PointActionTypes.SAVE_POINT,
  PointActionTypes.FILTER_POINTS
];
export type hideLoaderTypes = PointSelected | PointsRetrieved | ClearPoint;
export const hideLoaderActions = [
  PointActionTypes.POINT_SELECTED,
  PointActionTypes.CLEAR_POINT,
  PointActionTypes.POINTS_RETRIEVED
];

export type PointActions = GetPoints | SavePoint | PointsRetrieved |
  FilterPoints | ClearPoint | PointSelected | ToggleDialogPoint | PointMetadataRetrieved;
