import {PointActions, PointActionTypes} from './place.actions';

import {Point} from '../../shared/models/Place';
import {PaginationOptionsInterface} from '../../shared/common-list/common-list-item/pagination-options.interface';

export interface PointState {
  loading: boolean;
  points: Point[];
  metadata: PaginationOptionsInterface;
}

export const initialState: PointState = {
  loading: false,
  points: null,
  metadata: {
    previousPageIndex: 0,
    pageIndex: 1,
    pageSize: 10,
    length: 0
  }
};

export function pointReducer(state = initialState, action: PointActions): PointState {
  switch (action.type) {
    case PointActionTypes.GET_POINTS:
      return {...state, loading: true};
    case PointActionTypes.FILTER_POINTS:
      return {...state, loading: true, metadata: action.payload};
    case PointActionTypes.POINTS_RETRIEVED:
      return {...state, loading: false, points: action.payload, metadata: action.metadata};
    case PointActionTypes.ADD_POINT:
      return {...state, loading: true, points: action.payload.data, metadata: action.payload.metadata};
    default:
      return state;
  }
}
