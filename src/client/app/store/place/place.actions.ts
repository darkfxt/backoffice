import { Action } from '@ngrx/store';

import { Point, PointWithMetadata } from '../../shared/models/Place';
import {PageEvent} from '@angular/material';
import {PaginationOptionsInterface} from '../../shared/common-list/common-list-item/pagination-options.interface';

export enum PointActionTypes {
  GET_POINTS = '[Point] Retrieving',
  FILTER_POINTS = '[Point] Filtering',
  POINTS_RETRIEVED = '[Point] Retrieved Succesfully',
  ADD_POINT = '[Point] Adding Point'
}

export class GetPoints implements Action {
  readonly type = PointActionTypes.GET_POINTS;
  constructor(readonly payload: PaginationOptionsInterface) {
    this.payload = payload;
  }
}

export class FilterPoints implements Action {
  readonly type = PointActionTypes.FILTER_POINTS;
  constructor(readonly payload: PaginationOptionsInterface) {
    this.payload = payload;
  }
}

export class PointsRetrieved implements Action {
  readonly type = PointActionTypes.POINTS_RETRIEVED;
  readonly payload: Point[];
  readonly metadata: PaginationOptionsInterface;
  constructor(response: PointWithMetadata) {
    this.payload = response.data;
    this.metadata = response.metadata;

  }
}

export class AddPoint implements Action {
  readonly type = PointActionTypes.ADD_POINT;
  constructor(readonly payload: PointWithMetadata) {
    this.payload = payload;
  }
}

export type PointActions = GetPoints | AddPoint | PointsRetrieved | FilterPoints;
