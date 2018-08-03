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

export interface AppState {
  points: PointState;
}

export const reducers: ActionReducerMap<AppState> = {
  points: pointReducer
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

export { PointsRetrieved } from './place/place.actions';
