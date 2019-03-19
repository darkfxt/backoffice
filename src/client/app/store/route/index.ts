import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../shared/app.interfaces';
import * as fromSegments from './route.reducer';

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

export const getSegmentsErrors = createSelector(
  getSegmentsState,
  (state: any) => state.error
);

export const getSegmentSelected = createSelector(
  getSegmentsState,
  (state: any) => state.segmentSelected
);

export const getAllSegments = createSelector(
  getSegmentsEntityState,
    entities => {
    return Object.keys(entities).map(id => entities[id]);
  }
);

export const getSegmentDialogStatus = createSelector(
  getSegmentsState,
  (state: any) => state.dialog
);

export const getRouteDrawed = createSelector(
  getSegmentsState,
  (state: any) => state.routeDrawed
);
