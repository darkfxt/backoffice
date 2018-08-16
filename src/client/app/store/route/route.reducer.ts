import {SegmentActions, SegmentActionTypes} from './route.actions';

import {default as Segment} from '../../shared/models/Segment';
import {PaginationOptionsInterface} from '../../shared/common-list/common-list-item/pagination-options.interface';

export interface SegmentState {
  loading: boolean;
  segments: Segment[];
  metadata: PaginationOptionsInterface;
  segmentSelected?: Segment;
}

export const initialState: SegmentState = {
  loading: false,
  segments: null,
  metadata: {
    previousPageIndex: 0,
    pageIndex: 1,
    pageSize: 10,
    length: 0
  }
};

export function segmentReducer(state = initialState, action: SegmentActions): SegmentState {
  switch (action.type) {
    case SegmentActionTypes.GET_SEGMENTS:
      return {...state, loading: true};
    case SegmentActionTypes.SEGMENT_SELECTED:
      return {...state, loading: false, segmentSelected: action.payload};
    case SegmentActionTypes.FILTER_SEGMENTS:
      return {...state, loading: true, metadata: action.payload};
    case SegmentActionTypes.SEGMENTS_RETRIEVED:
      return {...state, loading: false, segments: action.payload, metadata: action.metadata};
    default:
      return state;
  }
}
