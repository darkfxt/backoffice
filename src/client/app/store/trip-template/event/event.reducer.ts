import {
  GetEventsForTripTemplate,
  EventsRetrieved,
  EventActions, EventActionTypes
} from './event.actions';

import { Event, DayOfTrip, TypeOfEvent } from '../../../shared/models/TripTemplate';
import {
  PaginationOptions,
  PaginationOptionsInterface
} from '../../../shared/common-list/common-list-item/pagination-options.interface';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface EventState extends EntityState<Event> {
  metadata: PaginationOptionsInterface;
  selectedTripTemplateEvents?: Event[];
  selectedEvent?: any;
  indexForEvent?: number;
  dayForEvent?: number;
  typeForEvent?: TypeOfEvent;
}

export const adapter: EntityAdapter<Event> = createEntityAdapter({
  selectId: (event: Event) => event._id,
  sortComparer: (event: Event) => event.order
});

export const initialState: EventState = adapter.getInitialState({
  metadata: new PaginationOptions()
});

export function eventReducer(state = initialState, action: EventActions): EventState {
  switch (action.type) {
    case EventActionTypes.GET_EVENTS:
      return {...state};
    case EventActionTypes.EVENTS_RETRIEVED:
      return adapter.addAll(action.payload, state); // {...state, selectedTripTemplateEvents: action.payload};
    case EventActionTypes.EVENT_SELECTED:
      return {...state, selectedEvent: action.payload};
    case EventActionTypes.ADD_EVENT: {
      // const array = state.selectedTripTemplateEvents ? state.selectedTripTemplateEvents.slice(0) : [];
      // const indexOfEvent = state.indexForEvent === undefined ? array.length : state.indexForEvent;
      // const productTypeEvent = state.typeForEvent;
      // const dayOfEvent = state.dayForEvent || 1 ;
      // const eventToAdd = Object.assign({}, action.payload, {ordinal: dayOfEvent, eventType: productTypeEvent});
      // array.splice(+indexOfEvent, 0, eventToAdd);
      const convertToEvent = new Event( action.payload.name,
                                        action.payload.description,
                                        state.typeForEvent,
                                        state.indexForEvent,
                                        action.payload);
      return adapter.addOne(convertToEvent, state);
      // {...state, selectedTripTemplateEvents: array,
      //  selectedEvent: null, indexForEvent: null, typeForEvent: null, dayForEvent: null};
    }
    case EventActionTypes.REMOVE_EVENT: {
      const array = state.selectedTripTemplateEvents ? state.selectedTripTemplateEvents.slice(0) : [];
      array.splice(+action.payload, 1);
      return {...state, selectedTripTemplateEvents: array,
        selectedEvent: null, indexForEvent: null, typeForEvent: null, dayForEvent: null};
    }
    case EventActionTypes.SELECT_ORDINAL_TO_ADD_EVENT:
      return {...state, indexForEvent: action.payload};
    case EventActionTypes.SELECT_EVENT_TYPE_DAY_ORDINAL:
      return {...state, dayForEvent: action.payload.day,
        typeForEvent: action.payload.type, indexForEvent: action.payload.index};
    default:
      return state;
  }
}
