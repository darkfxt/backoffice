import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../shared/app.interfaces';
import * as fromTripTemplates from './trip-template.reducer';

export interface TripTemplatesState {
  tripTemplates: fromTripTemplates.TripTemplateState;
}

export interface State extends AppState {
  tripTemplates: TripTemplatesState;
}

export const reducers = {
  tripTemplates: fromTripTemplates.tripTemplateReducer
};

export const getTripTemplatesState = createFeatureSelector<TripTemplatesState>('tripTemplates');

export const getTripTemplatesEntities = createSelector(
  getTripTemplatesState,
  (state: any) => state.entities
);

export const getTripTemplatesMetadata = createSelector(
  getTripTemplatesState,
  (state: any) => state.metadata
);

export const getTripTemplateSelected = createSelector(
  getTripTemplatesState,
  (state: any) => state.selectedTripTemplate
);

export const getAllTripTemplates = createSelector(
  getTripTemplatesEntities,
  entities => {
    return Object.keys(entities).map(id => entities[id]);
  }
);
