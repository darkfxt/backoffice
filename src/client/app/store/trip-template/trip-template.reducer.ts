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
import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';

export interface TripTemplateState extends EntityState<TripTemplate> {
  metadata: PaginationOptionsInterface;
  selectedTripTemplateEvents?: Event[];
  selectedTripTemplate?: string | null;
  selectedEvent?: any;
  indexForEvent?: number;
  dayForEvent?: number;
  typeForEvent?: TypeOfEvent;
  importTemplateId?: string;
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
    case TripTemplateActionTypes.TRIP_TEMPLATES_METADATA_RETRIEVED:
      return {...state, metadata: action.payload};
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
    case TripTemplateActionTypes.UPDATE_TRIP_TEMPLATE:
    case TripTemplateActionTypes.CREATE_TRIP_TEMPLATE:
      const tripTemplate = action.payload.tripTemplate;
      const entities = {...state.entities, [tripTemplate._id]: tripTemplate};
      const ids: Array<any> = state.ids.slice(0);
      if (!ids.includes(tripTemplate._id))
        ids.push(tripTemplate._id);
      return {...state, entities, ids};
    case TripTemplateActionTypes.IMPORT_TRIP_TEMPLATE:
      return {...state, importTemplateId: action.payload.tripTemplateId};
    case TripTemplateActionTypes.FILL_ITINERARY:
      return {...state};
    default:
      return state;
  }
}
