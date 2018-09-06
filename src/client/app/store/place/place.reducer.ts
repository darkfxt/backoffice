import { PointActions, PointActionTypes } from './place.actions';

import { Point } from '../../shared/models/Place';
import { PaginationOptionsInterface } from '../../shared/common-list/common-list-item/pagination-options.interface';
import {pointSelector} from '../index';
import {DialogActions} from '../dialog-actions.enum';

export interface PointState {
  loading: boolean;
  points: Point[];
  metadata: PaginationOptionsInterface;
  pointSelected?: Point;
  dialog?: DialogActions;
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
    case PointActionTypes.SAVE_POINT:
      return {...state, loading: true};
    case PointActionTypes.POINT_SELECTED:
      return {...state, loading: false, pointSelected: action.payload};
    case PointActionTypes.CLEAR_POINT:
      return {...state, loading: false, pointSelected: null};
    case PointActionTypes.TOGGLE_DIALOG:
      return {...state, loading: false, dialog: action.payload};
    default:
      return state;
  }
}
