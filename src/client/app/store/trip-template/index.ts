import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../shared/app.interfaces';
import * as fromTripTemplates from './trip-template.reducer';
import * as fromEvents from './event/event.reducer';
import { EventState } from './event/event.reducer';
import { DayState } from './day/day.reducer';
import { TripTemplate } from '../../shared/models/TripTemplate';

export interface TripTemplatesState {
  tripTemplates: fromTripTemplates.TripTemplateState;
  events: fromEvents.EventState;
}

export interface State extends AppState {
  tripTemplates: TripTemplatesState;
  events: EventState;
}

export const reducers = {
  tripTemplates: fromTripTemplates.tripTemplateReducer,
  events: fromEvents.eventReducer
};

// ***** Trip Templates section *****
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

// ***** Days Section *****
export const getDaysState = createFeatureSelector<DayState>('days');

export const getDayEntities = createSelector(
  getDaysState,
  (state: any) => state.entities
);

export const getDaysForSelectedTrip = createSelector(
  getTripTemplateSelected,
  (tripTemplate: TripTemplate) => {
    return tripTemplate.days;
  }
);

// ***** Events Section *****
export const getEventsState = createFeatureSelector<EventState>('events');

export const getEventEntities = createSelector(
  getEventsState,
  (state: any) => state.entities
);
