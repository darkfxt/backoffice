import {
  GetTripTemplates,
  TripTemplatesRetrieved,
  GetEventsForTripTemplate,
  EventsRetrieved,
  TripTemplateActions, TripTemplateActionTypes
} from './trip-template.actions';

import { TripTemplate, Event, eventType } from '../../shared/models/TripTemplate';
import { PaginationOptionsInterface } from '../../shared/common-list/common-list-item/pagination-options.interface';

export interface TripTemplateState {
  loading: boolean;
  tripTemplates: TripTemplate[];
  metadata: PaginationOptionsInterface;
  selectedTripTemplateEvents?: Event[];
  selectedTripTemplate?: TripTemplate;
  selectedEvent?: any;
  indexForEvent?: number;
  dayForEvent?: number;
  typeForEvent?: eventType;
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
      return {...state, loading: false, selectedTripTemplateEvents: null, selectedTripTemplate: null,
        selectedEvent: null, indexForEvent: null, dayForEvent: null};
    case TripTemplateActionTypes.TRIP_TEMPLATE_PROCESSED_SUCCESFULLY:
      return {...state, loading: false, selectedTripTemplateEvents: null,
        selectedEvent: null, indexForEvent: null, dayForEvent: null};
    case TripTemplateActionTypes.GET_EVENTS_FOR_T_TEMPLATE:
      return {...state, loading: true};
    case TripTemplateActionTypes.EVENTS_RETRIEVED_FOR_TEMPLATE:
      return {...state, loading: false, selectedTripTemplateEvents: action.payload};
    case TripTemplateActionTypes.EVENT_SELECTED:
      return {...state, loading: false, selectedEvent: action.payload};
    case TripTemplateActionTypes.ADD_EVENT: {
      const array = state.selectedTripTemplateEvents ? state.selectedTripTemplateEvents.slice(0) : [];
      const indexOfEvent = state.indexForEvent === undefined ? array.length : state.indexForEvent;
      const productTypeEvent = state.typeForEvent;
      const dayOfEvent = state.dayForEvent || 1 ;
      const eventToAdd = Object.assign({}, action.payload, {ordinal: dayOfEvent, eventType: productTypeEvent});
      array.splice(+indexOfEvent, 0, eventToAdd);
      return {...state, loading: false, selectedTripTemplateEvents: array,
        selectedEvent: null, indexForEvent: null, typeForEvent: null, dayForEvent: null};
    }
    case TripTemplateActionTypes.SELECT_ORDINAL_TO_ADD_EVENT:
      return {...state, loading: false, indexForEvent: action.payload};
    case TripTemplateActionTypes.SELECT_DAY_TO_ADD_EVENT:
      return {...state, loading: false, dayForEvent: action.payload};
    case TripTemplateActionTypes.SELECT_EVENT_TYPE_DAY_ORDINAL:
      return {...state, loading: false, dayForEvent: action.payload.day,
        typeForEvent: action.payload.type, indexForEvent: action.payload.index};
    default:
      return state;
  }
}
