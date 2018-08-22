import {
  GetTripTemplates,
  TripTemplatesRetrieved,
  GetEventsForTripTemplate,
  EventsRetrieved,
  TripTemplateActions, TripTemplateActionTypes
} from './trip-template.actions';

import { TripTemplate, Event } from '../../shared/models/TripTemplate';
import {PaginationOptionsInterface} from '../../shared/common-list/common-list-item/pagination-options.interface';

export interface TripTemplateState {
  loading: boolean;
  tripTemplates: TripTemplate[];
  metadata: PaginationOptionsInterface;
  selectedTripTemplateEvents?: Event[];
  selectedTripTemplate?: TripTemplate;
  selectedEvent?: any;
  ordinalForEvent?: number;
  dayForEvent?: number;
}

export const initialState: TripTemplateState = {
  loading: false,
  tripTemplates: null,
  metadata: {
    previousPageIndex: 0,
    pageIndex: 1,
    pageSize: 10,
    length: 0
  }
};

export function tripTemplateReducer(state = initialState, action: TripTemplateActions): TripTemplateState {
  switch (action.type) {
    case TripTemplateActionTypes.GET_TRIP_TEMPLATES :
      return {...state, loading: true};
    case TripTemplateActionTypes.TRIP_TEMPLATES_RETRIEVED:
      return {...state, loading: false, tripTemplates: action.payload, metadata: action.metadata};
    case TripTemplateActionTypes.CREATE_TRIP_TEMPLATE:
      return {...state, loading: true};
    case TripTemplateActionTypes.TRIP_TEMPLATE_SELECTED:
      return {...state, loading: false, selectedTripTemplate: action.payload};
    case TripTemplateActionTypes.SAVE_TRIP_TEMPLATE:
      return {...state, loading: true};
    case TripTemplateActionTypes.TRIP_TEMPLATE_LEAVE_EDITION:
      return {...state, loading: false, selectedTripTemplateEvents: null, selectedEvent: null, ordinalForEvent: null, dayForEvent: null};
    case TripTemplateActionTypes.TRIP_TEMPLATE_PROCESSED_SUCCESFULLY:
      return {...state, loading: false, selectedTripTemplateEvents: null, selectedEvent: null, ordinalForEvent: null, dayForEvent: null};
    case TripTemplateActionTypes.GET_EVENTS_FOR_T_TEMPLATE:
      return {...state, loading: true};
    case TripTemplateActionTypes.EVENTS_RETRIEVED_FOR_TEMPLATE:
      return {...state, loading: false, selectedTripTemplateEvents: action.payload};
    case TripTemplateActionTypes.EVENT_SELECTED:
      return {...state, loading: false, selectedEvent: action.payload};
    case TripTemplateActionTypes.ADD_EVENT: {
      const array = state.selectedTripTemplateEvents ? state.selectedTripTemplateEvents.slice(0) : [];
      const indexOfEvent = state.ordinalForEvent === undefined ? array.length : state.ordinalForEvent;
      console.log('peeepe', state);
      const dayOfEvent = state.dayForEvent || 1 ;
      const eventToAdd = Object.assign({}, action.payload, {ordinal: dayOfEvent});
      array.splice(+indexOfEvent,0, eventToAdd);
      return {...state, loading: false, selectedTripTemplateEvents: array, selectedEvent: null, ordinalForEvent: null};
    }
    case TripTemplateActionTypes.SELECT_ORDINAL_TO_ADD_EVENT:
      return {...state, loading: false, ordinalForEvent: action.payload};
    case TripTemplateActionTypes.SELECT_DAY_TO_ADD_EVENT:
      return {...state, loading: false, dayForEvent: action.payload};
    default:
      return state;
  }
}
