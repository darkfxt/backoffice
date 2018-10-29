import {
  GetEventsForTripTemplate,
  EventsRetrieved,
  EventActions, EventActionTypes
} from './event.actions';

import {Event, DayOfTrip, TypeOfEvent, terminalType} from '../../../shared/models/TripTemplate';
import {
  PaginationOptions,
  PaginationOptionsInterface
} from '../../../shared/common-list/common-list-item/pagination-options.interface';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface EventState extends EntityState<Event> {
  metadata: PaginationOptionsInterface;
  selectedTripTemplateEvents?: Event[];
  selectedEvent?: {_id: string, type: string};
  selectedDriving?: Event;
  terminalToReplace?: string;
  selectedTerminal?: any;
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
      const newEvent = action.payload.event;
      const entities = {...state.entities, [newEvent._id]: newEvent};
      const ids: Array<any> = state.ids.slice(0);
      ids.splice(+state.indexForEvent, 0, newEvent._id);
      return {...state, entities, ids};
    }
    case EventActionTypes.REMOVE_EVENT: {
      return adapter.removeOne(action.payload._id, state);
    }
    case EventActionTypes.UPDATE_EVENT:
      const event = action.payload;
      const entities = {...state.entities, [event._id]: event};
      return {...state, entities};
    case EventActionTypes.CLEAR_EVENT:
      return {...state};
    case EventActionTypes.SELECT_TERMINAL:
      return {...state, selectedTerminal: action.payload.terminal};
    case EventActionTypes.DRIVING_EVENT_SELECTED:
      return {...state, selectedDriving: action.payload.event, terminalToReplace: action.payload.terminal};
    case EventActionTypes.SELECT_ORDINAL_TO_ADD_EVENT:
      return {...state, indexForEvent: action.payload};
    case EventActionTypes.SELECT_EVENT_TYPE_DAY_ORDINAL:
      return {...state, dayForEvent: action.payload.day,
        typeForEvent: action.payload.type, indexForEvent: action.payload.index};
    default:
      return state;
  }
}
