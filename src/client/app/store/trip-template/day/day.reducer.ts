import {
  GetDaysForTripTemplate,
  DaysRetrieved,
  DayActions, DayActionTypes
} from './day.actions';

import { DayOfTrip } from '../../../shared/models/TripTemplate';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface DayState extends EntityState<DayOfTrip> {
  selectedDay?: string | null;
  indexForDay?: number;
}

export const adapter: EntityAdapter<DayOfTrip> = createEntityAdapter({
  selectId: (day: DayOfTrip) => day._id
});

export const initialState: DayState = adapter.getInitialState({ });

export function dayReducer(state = initialState, action: DayActions): DayState {
  switch (action.type) {
    case DayActionTypes.GET_DAYS:
      return {...state};
    case DayActionTypes.DAYS_RETRIEVED:
      return adapter.addAll(action.payload, state); // {...state, selectedTripTemplateDays: action.payload};
    case DayActionTypes.DAY_SELECTED:
      return {...state, selectedDay: action.payload};
    case DayActionTypes.ADD_DAY: {
      return adapter.addOne(action.payload, state);
      // return {...state};
    }
    case DayActionTypes.REMOVE_DAY: {
      return adapter.removeOne(action.payload._id, state);
    }
    case DayActionTypes.SELECT_ORDINAL_TO_ADD_DAY:
      return {...state, indexForDay: action.payload};
    case DayActionTypes.UPDATE_DAY:
      // const events = state.selectedDay.events.slice(0);
      // events.push(action.payload);
      // const selectedDay = Object.assign({}, state.selectedDay, {events});
      const day = action.payload;
      const entities = {...state.entities, [day._id]: day};
      return {...state, entities};
    default:
      return state;
  }
}
