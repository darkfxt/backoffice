import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';

import { pointReducer, PointState } from './place/place.reducer';

import { environment } from '../../environments/environment';
import {segmentReducer, SegmentState} from './route/route.reducer';

export interface AppState {
  points: PointState;
  segments: SegmentState;
}

export const reducers: ActionReducerMap<AppState> = {
  points: pointReducer,
  segments: segmentReducer
};

export function logger(reducer: ActionReducer<AppState>) {
  return storeLogger()(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [storeFreeze, logger]
  : [];

const PointStateSelector = createFeatureSelector('points');

export const loadingSelector = createSelector(
  PointStateSelector,
  (state: PointState) => state.loading,
);

export const pointSelector = createSelector(
  PointStateSelector,
  (state: PointState) => state.points,
);

export const metadataSelector = createSelector(
  PointStateSelector,
  (state: PointState) => state.metadata,
);

const SegmentStateSelector = createFeatureSelector('segments');

export const segmentLoadingSelector = createSelector(
  SegmentStateSelector,
  (state: SegmentState) => state.loading
);

export const segmentSelector = createSelector(
  SegmentStateSelector,
  (state: SegmentState) => state.segments
);

export const segmentMetadataSelector = createSelector(
  SegmentStateSelector,
  (state: SegmentState) => state.metadata
);

export { PointsRetrieved } from './place/place.actions';
export { SegmentsRetrieved } from './route/route.actions';
