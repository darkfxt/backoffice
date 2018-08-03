import { PointActions, PointActionTypes } from './place.actions';

import { Point } from '../../shared/models/Place';

export interface PointState {
  loading: boolean;
  points: Point[];
  totalCount: number;
}

export const initialState: PointState = {
  loading: false,
  points: null,
  totalCount: 0
};

export function pointReducer(state = initialState, action: PointActions): PointState {
  switch (action.type) {
    case PointActionTypes.GET_POINTS:
      return { ...state, loading: true };
    case PointActionTypes.FILTER_POINTS:
      return { ...state, loading: true};
    case PointActionTypes.POINTS_RETRIEVED:
      return { ...state, loading: false, points: action.payload.data, totalCount: action.payload.count };
    case PointActionTypes.ADD_POINT:
      return { ...state, loading: true, points: action.payload.data, totalCount: action.payload.count };
    default:
      return state;
  }
}
