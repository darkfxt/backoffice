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
    case TripTemplateActionTypes.SAVE_TRIP_TEMPLATE: {
      return {...state, loading: true};
    }
    case TripTemplateActionTypes.GET_EVENTS_FOR_T_TEMPLATE:
      return {...state, loading: true};
    case TripTemplateActionTypes.EVENTS_RETRIEVED_FOR_TEMPLATE:
      return {...state, loading: false, selectedTripTemplateEvents: action.payload};
    case TripTemplateActionTypes.EVENT_SELECTED:
      return {...state, loading: false, selectedEvent: action.payload};
    case TripTemplateActionTypes.ADD_EVENT: {
      // state.selectedTripTemplateEvents.splice(state.ordinalForEvent,0, action.payload);
      const array = state.selectedTripTemplateEvents.slice(0);
      const indexOfEvent = state.ordinalForEvent === undefined ? array.length : state.ordinalForEvent;
      array.splice(+indexOfEvent,0, action.payload);
      return {...state, loading: false, selectedTripTemplateEvents: array, selectedEvent: null, ordinalForEvent: null};
    }
    case TripTemplateActionTypes.SELECT_ORDINAL_TO_ADD_EVENT:
      return {...state, loading: false, ordinalForEvent: action.payload};
    default:
      return state;
  }
}
