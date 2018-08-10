import {
  GetTripTemplates,
  TripTemplatesRetrieved,
  GetEventsForTripTemplate,
  EventsRetrieved,
  TripTemplateActions, TripTemplateActionTypes
} from './trip-template.actions';

import { TripTemplate } from '../../shared/models/TripTemplate';
import {PaginationOptionsInterface} from '../../shared/common-list/common-list-item/pagination-options.interface';

export interface TripTemplateState {
  loading: boolean;
  tripTemplates: TripTemplate[];
  metadata: PaginationOptionsInterface;
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
      return {...state, loading: true, tripTemplates: action.payload, metadata: action.metadata};
    default:
      return state;
  }
}
