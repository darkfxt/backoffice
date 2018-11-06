import { Action } from '@ngrx/store';

import {default as Segment, SegmentWithMetadata } from '../../shared/models/Segment';
import { PaginationOptionsInterface } from '../../shared/common-list/common-list-item/pagination-options.interface';
import { DialogActions } from '../dialog-actions.enum';

export enum SegmentActionTypes {
  GET_SEGMENTS = '[Segment] Retrieving',
  FILTER_SEGMENTS = '[Segment] Filtering',
  SEGMENTS_RETRIEVED = '[Segment] Retrieved Succesfully',
  SEGMENT_SELECTED = '[Segment] Selected',
  CLEAR_SEGMENT = '[Segment] Clear',
  SAVE_SEGMENT = '[Segment] Saving To DB',
  TOGGLE_DIALOG = '[Segment] Set Dialog',
  SEGMENTS_METADATA_RETRIEVED = '[Segment] Metadata Retrieved'
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
  SegmentActionTypes.SEGMENTS_RETRIEVED
];

export type SegmentActions = GetSegments | SegmentsRetrieved |
  FilterSegments | SegmentSelected | SaveSegment | ClearSegment |
  ToggleSegmentDialog | SegmentsMetadataRetrieved;
