import {
  GetTripTemplates,
  TripTemplatesRetrieved,
  GetEventsForTripTemplate,
  EventsRetrieved,
  TripTemplateActions, TripTemplateActionTypes
} from './trip-template.actions';

import { TripTemplate, Event, eventType } from '../../shared/models/TripTemplate';
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
  typeForEvent?: eventType;
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
    case TripTemplateActionTypes.GET_EVENTS_FOR_T_TEMPLATE:
      return {...state};
    case TripTemplateActionTypes.EVENTS_RETRIEVED_FOR_TEMPLATE:
      return {...state, selectedTripTemplateEvents: action.payload};
    case TripTemplateActionTypes.EVENT_SELECTED:
      return {...state, selectedEvent: action.payload};
    case TripTemplateActionTypes.ADD_EVENT: {
      const array = state.selectedTripTemplateEvents ? state.selectedTripTemplateEvents.slice(0) : [];
      const indexOfEvent = state.indexForEvent === undefined ? array.length : state.indexForEvent;
      const productTypeEvent = state.typeForEvent;
      const dayOfEvent = state.dayForEvent || 1 ;
      const eventToAdd = Object.assign({}, action.payload, {ordinal: dayOfEvent, eventType: productTypeEvent});
      array.splice(+indexOfEvent, 0, eventToAdd);
      return {...state, selectedTripTemplateEvents: array,
        selectedEvent: null, indexForEvent: null, typeForEvent: null, dayForEvent: null};
    }
    case TripTemplateActionTypes.REMOVE_EVENT: {
      const array = state.selectedTripTemplateEvents ? state.selectedTripTemplateEvents.slice(0) : [];
      array.splice(+action.payload, 1);
      return {...state, selectedTripTemplateEvents: array,
        selectedEvent: null, indexForEvent: null, typeForEvent: null, dayForEvent: null};
    }
    case TripTemplateActionTypes.SELECT_ORDINAL_TO_ADD_EVENT:
      return {...state, indexForEvent: action.payload};
    case TripTemplateActionTypes.SET_NAME_FOR_TEMPLATE:
      const template: TripTemplate = state.selectedTripTemplate ?
        Object.assign(state.selectedTripTemplate) :
        new TripTemplate();
      template.name = action.payload;
      return {...state, selectedTripTemplate: template};
    case TripTemplateActionTypes.SET_DESCRIPTION_FOR_TEMPLATE:
      const temp: TripTemplate = state.selectedTripTemplate ?
        Object.assign( state.selectedTripTemplate )  :
        new TripTemplate();
      template.description = action.payload;
      return {...state, selectedTripTemplate: temp};
    case TripTemplateActionTypes.SELECT_EVENT_TYPE_DAY_ORDINAL:
      return {...state, dayForEvent: action.payload.day,
        typeForEvent: action.payload.type, indexForEvent: action.payload.index};
    default:
      return state;
  }
}
