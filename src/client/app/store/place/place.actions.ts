import { Action } from '@ngrx/store';

import { Point, PointWithMetadata } from '../../shared/models/Place';
import {PageEvent} from '@angular/material';

export enum PointActionTypes {
  GET_POINTS = '[Point] Retrieving',
  FILTER_POINTS = '[Point] Filtering',
  POINTS_RETRIEVED = '[Point] Retrieved Succesfully',
  ADD_POINT = '[Point] Adding Point'
}

export class GetPoints implements Action {
  readonly type = PointActionTypes.GET_POINTS;
  constructor(readonly payload: PageEvent) {
    this.payload = payload;
  }
}

export class FilterPoints implements Action {
  readonly type = PointActionTypes.FILTER_POINTS;
  constructor(readonly payload: string) {
    this.payload = payload;
  }
}

export class PointsRetrieved implements Action {
  readonly type = PointActionTypes.POINTS_RETRIEVED;
  constructor(readonly payload: PointWithMetadata) {
    this.payload = payload;
  }
}

export class AddPoint implements Action {
  readonly type = PointActionTypes.ADD_POINT;
  constructor(readonly payload: PointWithMetadata) {
    this.payload = payload;
  }
}

export type PointActions = GetPoints | AddPoint | PointsRetrieved | FilterPoints;
