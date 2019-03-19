import { Action } from '@ngrx/store';

import {default as Segment, Leg, SegmentWithMetadata } from '../../shared/models/Segment';
import { PaginationOptionsInterface } from '../../shared/common-list/common-list-item/pagination-options.interface';
import { DialogActions } from '../dialog-actions.enum';
import { ApiError } from '../../shared/models/ApiError';

export enum SegmentActionTypes {
  GET_SEGMENTS = '[Segment] Retrieving',
  FILTER_SEGMENTS = '[Segment] Filtering',
  SEGMENTS_RETRIEVED = '[Segment] Retrieved Succesfully',
  SEGMENT_SELECTED = '[Segment] Selected',
  CLEAR_SEGMENT = '[Segment] Clear',
  SAVE_SEGMENT = '[Segment] Saving To DB',
  SAVE_SUCCESFUL = '[Segment] Save Segment Succesful',
  ERROR_SAVING = '[Segment] Error Saving Segment',
  TOGGLE_DIALOG = '[Segment] Set Dialog',
  SEGMENTS_METADATA_RETRIEVED = '[Segment] Metadata Retrieved',
  ROUTE_DRAWED = '[Route] Route Drawed'
}

export class GetSegments implements Action {
  readonly type = SegmentActionTypes.GET_SEGMENTS;
  constructor(readonly payload: PaginationOptionsInterface) {
    this.payload = payload;
  }
}

export class SegmentSelected implements Action {
  readonly type = SegmentActionTypes.SEGMENT_SELECTED;
  constructor(readonly payload: Segment) {
    this.payload = payload;
  }
}

export class FilterSegments implements Action {
  readonly type = SegmentActionTypes.FILTER_SEGMENTS;
  constructor(readonly payload: PaginationOptionsInterface) {
    this.payload = payload;
  }
}

export class SaveSegment implements Action {
  readonly type = SegmentActionTypes.SAVE_SEGMENT;
  constructor(readonly payload: any) {
    this.payload = payload;
  }
}

export class ClearSegment implements Action {
  readonly type = SegmentActionTypes.CLEAR_SEGMENT;
  constructor() {
  }
}

export class ToggleSegmentDialog implements Action {
  readonly type = SegmentActionTypes.TOGGLE_DIALOG;
  constructor(readonly payload: DialogActions = DialogActions.FALSE) {
    this.payload = payload;
  }
}

export class SegmentsRetrieved implements Action {
  readonly type = SegmentActionTypes.SEGMENTS_RETRIEVED;
  constructor(public payload: Array<Segment>) {
  }
}

export class ErrorSavingSegment implements Action {
  readonly type = SegmentActionTypes.ERROR_SAVING;
  constructor(public payload: ApiError) {
  }
}

export class SegmentsMetadataRetrieved implements Action {
  readonly type = SegmentActionTypes.SEGMENTS_METADATA_RETRIEVED;
  constructor(public payload: PaginationOptionsInterface) { }
}

export type showLoaderTypes = GetSegments | FilterSegments | SaveSegment;
export const showLoaderActions = [
  SegmentActionTypes.GET_SEGMENTS,
  SegmentActionTypes.FILTER_SEGMENTS,
  SegmentActionTypes.SAVE_SEGMENT
];
export type hideLoaderTypes = SegmentSelected | SegmentsRetrieved | ClearSegment;
export const hideLoaderActions = [
  SegmentActionTypes.CLEAR_SEGMENT,
  SegmentActionTypes.SEGMENT_SELECTED,
  SegmentActionTypes.SEGMENTS_RETRIEVED,
  SegmentActionTypes.ERROR_SAVING
];

export class RouteDrawed implements Action {
  readonly type = SegmentActionTypes.ROUTE_DRAWED;
  constructor(public payload: Leg[]) { }
}

export type SegmentActions = GetSegments | SegmentsRetrieved |
  FilterSegments | SegmentSelected | SaveSegment | ClearSegment |
  ToggleSegmentDialog | SegmentsMetadataRetrieved | ErrorSavingSegment | RouteDrawed;
