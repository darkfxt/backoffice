import { Action } from '@ngrx/store';

import {default as Segment, SegmentWithMetadata} from '../../shared/models/Segment';
import {PaginationOptionsInterface} from '../../shared/common-list/common-list-item/pagination-options.interface';

export enum SegmentActionTypes {
  GET_SEGMENTS = '[Segment] Retrieving',
  FILTER_SEGMENTS = '[Segment] Filtering',
  SEGMENTS_RETRIEVED = '[Segment] Retrieved Succesfully',
  SEGMENT_SELECTED = '[Segment] Selected'
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

export class SegmentsRetrieved implements Action {
  readonly type = SegmentActionTypes.SEGMENTS_RETRIEVED;
  readonly payload: Segment[];
  readonly metadata: PaginationOptionsInterface;
  constructor(response: SegmentWithMetadata) {
    this.payload = response.data;
    this.metadata = response.metadata;

  }
}

export type SegmentActions = GetSegments | SegmentsRetrieved | FilterSegments | SegmentSelected;
