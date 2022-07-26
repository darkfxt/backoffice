import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SegmentActions, SegmentActionTypes } from './route.actions';

import {default as Segment, Leg} from '../../shared/models/Segment';
import { PaginationOptionsInterface, PaginationOptions } from '../../shared/common-list/common-list-item/pagination-options.interface';
import { DialogActions } from '../dialog-actions.enum';
import { ApiError } from '../../shared/models/ApiError';

export interface SegmentState extends EntityState<Segment> {
    metadata: PaginationOptionsInterface;
    segmentSelected?: Segment;
    dialog?: DialogActions;
    routeDrawed?: Leg[];
    error?: ApiError;
  }

export const adapter: EntityAdapter<Segment> = createEntityAdapter({
  selectId: (segment: Segment) => segment._id
});

export const initialState = adapter.getInitialState({
  metadata: new PaginationOptions()
});

export function segmentReducer(state: SegmentState = initialState, action: SegmentActions): SegmentState {
  switch (action.type) {
    case SegmentActionTypes.GET_SEGMENTS:
      return {...state};
    case SegmentActionTypes.SEGMENT_SELECTED:
      return {...state, segmentSelected: action.payload};
    case SegmentActionTypes.SEGMENTS_RETRIEVED:
      return adapter.addAll(action.payload, state);
    case SegmentActionTypes.SEGMENTS_METADATA_RETRIEVED:
      return {...state, metadata: action.payload};
    case SegmentActionTypes.FILTER_SEGMENTS:
      return {...state, metadata: action.payload};
    case SegmentActionTypes.SAVE_SEGMENT:
      return {...state, error: undefined};
    case SegmentActionTypes.CLEAR_SEGMENT:
      return {...state, segmentSelected: null};
    case SegmentActionTypes.ERROR_SAVING:
      return {...state, error: action.payload};
    case SegmentActionTypes.TOGGLE_DIALOG:
      return {...state, dialog: action.payload};
    case SegmentActionTypes.ROUTE_DRAWED:
      return {...state, routeDrawed: action.payload};
    default:
      return state;
  }
}

export const getSegmentsMetadata = (state: SegmentState) => state.metadata;
export const getSegmentSelected = (state: SegmentState) => state.segmentSelected;
