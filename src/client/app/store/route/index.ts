import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../shared/app.interfaces';
import * as fromSegments from './route.reducer';
import { PaginationOptionsInterface } from '../../shared/common-list/common-list-item/pagination-options.interface';

export interface SegmentsState {
  segments: fromSegments.SegmentState;
}

export interface State extends AppState {
  segments: SegmentsState;
}

export const reducers = {
  segments: fromSegments.segmentReducer
};

export const getSegmentsState = createFeatureSelector<SegmentsState>('segments');

export const getSegmentsEntityState = createSelector(
  getSegmentsState,
  (state: any) => state.entities
);

export const getSegmentsMetadata = createSelector(
  getSegmentsState,
  (state: any) => state.metadata
);

export const getSegmentSelected = createSelector(
  getSegmentsEntityState,
  fromSegments.getSegmentSelected
);

export const getAllSegments = createSelector(
  getSegmentsEntityState,
    entities => {
    return Object.keys(entities).map(id => entities[id]);
  }
);


