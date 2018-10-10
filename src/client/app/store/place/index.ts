import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../shared/app.interfaces';
import * as fromPoints from './place.reducer';
import { SegmentsState } from '../route';

export interface PointState {
  points: fromPoints.PointState;
}

export interface State extends AppState {
  points: PointState;
}

export const reducers = {
  points: fromPoints.pointReducer
};

export const getPointsState = createFeatureSelector<PointState>('points');

export const getPointsEntity = createSelector(
  getPointsState,
  (state: any) => state.entities
);

export const getPointsMetadata = createSelector(
  getPointsState,
  (state: any) => state.metadata
);

export const getPointSelected = createSelector(
  getPointsState,
  (state: any) => state.pointSelected
);

export const getAllPoints = createSelector(
  getPointsEntity,
  entities => {
    return Object.keys(entities).map(id => entities[id]);
  }
);
