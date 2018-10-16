import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SegmentActions, SegmentActionTypes } from './route.actions';

import { default as Segment } from '../../shared/models/Segment';
import { PaginationOptionsInterface, PaginationOptions } from '../../shared/common-list/common-list-item/pagination-options.interface';
import { DialogActions } from '../dialog-actions.enum';

export interface SegmentState extends EntityState<Segment> {
    metadata: PaginationOptionsInterface;
    segmentSelected?: Segment;
    dialog?: DialogActions;
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
      return adapter.addOne(action.payload, state);
    case SegmentActionTypes.SEGMENTS_RETRIEVED:
      return adapter.addAll(action.payload, state);
    case SegmentActionTypes.SEGMENTS_METADATA_RETRIEVED:
      return {...state, metadata: action.payload};
    case SegmentActionTypes.FILTER_SEGMENTS:
      return {...state, metadata: action.payload};
    case SegmentActionTypes.SAVE_SEGMENT:
      return {...state};
    case SegmentActionTypes.CLEAR_SEGMENT:
      return {...state, segmentSelected: null};
    case SegmentActionTypes.TOGGLE_DIALOG:
      return {...state, dialog: action.payload};
    default:
      return state;
  }
}

export const getSegmentsMetadata = (state: SegmentState) => state.metadata;
export const getSegmentSelected = (state: SegmentState) => state.segmentSelected;
