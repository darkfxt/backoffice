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

export const getTripTemplatesIds = createSelector(
  getTripTemplatesState,
  (state: any) => state.ids
)

export const getTripTemplateSelectedId = createSelector(
  getTripTemplatesState,
  (state: any) => state.selectedTripTemplate
);

export const getCurrentTripTemplate = createSelector(
  getTripTemplatesEntities,
  getTripTemplateSelectedId,
  (tripTemplateEntities, tripTemplateId) => {
    return tripTemplateEntities[tripTemplateId];
  }
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
  getTripTemplatesEntities,
  getTripTemplateSelectedId,
  (tTemplateEntities, tTemplateId) => {
    if (tTemplateEntities[tTemplateId])
      return tTemplateEntities[tTemplateId].days;
  }
);

export const getSelectedDayId = createSelector(
  getDaysState,
  (state: any) => state.selectedDay
);

export const getCurrentDay = createSelector(
  getDayEntities,
  getSelectedDayId,
  (dayEntities, dayId) => {
    return dayEntities[dayId];
  }
);

export const getAllDays = createSelector(
  getDayEntities,
  entities => {
    return Object.keys(entities).map(id => entities[id]);
  }
);

// ***** Events Section *****
export const getEventsState = createFeatureSelector<EventState>('events');

export const getEventEntities = createSelector(
  getEventsState,
  (state: any) => state.entities
);

export const getAllEvents = createSelector(
  getEventEntities,
  entities => {
    return Object.keys(entities).map(id => entities[id]);
  }
);

export const getSelectedEventId = createSelector(
  getEventsState,
  (state: any) => state.selectedEvent
);

export const getSelectedDriving = createSelector(
  getEventsState,
  (state: any) => state.selectedDriving
);

export const getCurrentEvent = createSelector(
  getEventEntities,
  getSelectedEventId,
  (eventEntities, eventId) => {
    return eventEntities[eventId];
  }
);
