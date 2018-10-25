import {
  GetTripTemplates,
  TripTemplatesRetrieved,
  TripTemplateActions, TripTemplateActionTypes
} from './trip-template.actions';

import { TripTemplate, Event, TypeOfEvent } from '../../shared/models/TripTemplate';
import {
  PaginationOptions,
  PaginationOptionsInterface
} from '../../shared/common-list/common-list-item/pagination-options.interface';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface TripTemplateState extends EntityState<TripTemplate> {
  metadata: PaginationOptionsInterface;
  selectedTripTemplateEvents?: Event[];
  selectedTripTemplate?: TripTemplate;
  selectedEvent?: any;
  indexForEvent?: number;
  dayForEvent?: number;
  typeForEvent?: TypeOfEvent;
}

export const adapter: EntityAdapter<TripTemplate> = createEntityAdapter({
  selectId: (tripTemplate: TripTemplate) => tripTemplate._id
});

export const initialState: TripTemplateState = adapter.getInitialState({
  metadata: new PaginationOptions()
});

export function tripTemplateReducer(state = initialState, action: TripTemplateActions): TripTemplateState {
  switch (action.type) {
    case TripTemplateActionTypes.GET_TRIP_TEMPLATES :
      return {...state};
    case TripTemplateActionTypes.TRIP_TEMPLATES_RETRIEVED:
      return adapter.addAll(action.payload, state);
    case TripTemplateActionTypes.CREATE_TRIP_TEMPLATE:
      return {...state};
    case TripTemplateActionTypes.TRIP_TEMPLATE_SELECTED:
      return {...state, selectedTripTemplate: action.payload};
    case TripTemplateActionTypes.SAVE_TRIP_TEMPLATE:
      return {...state};
    case TripTemplateActionTypes.TRIP_TEMPLATE_LEAVE_EDITION:
      return {...state, selectedTripTemplateEvents: null, selectedTripTemplate: null,
        selectedEvent: null, indexForEvent: null, dayForEvent: null};
    case TripTemplateActionTypes.TRIP_TEMPLATE_PROCESSED_SUCCESFULLY:
      return {...state, selectedTripTemplateEvents: null,
        selectedEvent: null, indexForEvent: null, dayForEvent: null};
    // case TripTemplateActionTypes.SET_NAME_FOR_TEMPLATE:
    //   const template: TripTemplate = state.selectedTripTemplate ?
    //     Object.assign(state.selectedTripTemplate) :
    //     new TripTemplate();
    //   template.name = action.payload;
    //   return {...state, selectedTripTemplate: template};
    // case TripTemplateActionTypes.SET_DESCRIPTION_FOR_TEMPLATE:
    //   const temp: TripTemplate = state.selectedTripTemplate ?
    //     Object.assign( state.selectedTripTemplate )  :
    //     new TripTemplate();
    //   template.description = action.payload;
    //   return {...state, selectedTripTemplate: temp};
    case TripTemplateActionTypes.ADD_DAY_TO_SELECTED_TEMPLATE:
      const days = state.selectedTripTemplate.days ? state.selectedTripTemplate.days.slice(0) : [];
      days.push(action.payload);
      const tripTemplate = Object.assign({}, state.selectedTripTemplate, {days});
      return {...state, selectedTripTemplate: tripTemplate };
    case TripTemplateActionTypes.UPDATE_DAY_ON_SELECTED_TEMPLATE:
      const filteredDays = state.selectedTripTemplate.days
        .filter((day: any) => day._id !== action.payload.selectedDay._id).slice(0);
      const dayToUpdate = Object.assign({}, action.payload.selectedDay);
      // const dayEvents = action.payload.selectedDay.events.slice(0);
      // dayEvents.push(action.payload.event);
      // dayToUpdate.events = dayEvents;
      filteredDays.push(dayToUpdate);
      const trip_template = Object.assign({}, state.selectedTripTemplate, {days: filteredDays});
      return {...state, selectedTripTemplate: trip_template };
    default:
      return state;
  }
}
