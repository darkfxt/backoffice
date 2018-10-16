import { PointActions, PointActionTypes } from './place.actions';

import { Point } from '../../shared/models/Place';
import { PaginationOptionsInterface, PaginationOptions } from '../../shared/common-list/common-list-item/pagination-options.interface';
import { DialogActions } from '../dialog-actions.enum';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface PointState extends EntityState<Point> {
  metadata: PaginationOptionsInterface;
  pointSelected?: Point;
  dialog?: DialogActions;
}

export const adapter: EntityAdapter<Point> = createEntityAdapter({
  selectId: (point: Point) => point._id
});

export const initialState: PointState = adapter.getInitialState( {
  metadata: new PaginationOptions()
});

export function pointReducer(state = initialState, action: PointActions): PointState {
  switch (action.type) {
    case PointActionTypes.GET_POINTS:
      return {...state};
    case PointActionTypes.FILTER_POINTS:
      return {...state, metadata: action.payload};
    case PointActionTypes.POINTS_RETRIEVED:
      return adapter.addAll(action.payload, state);
    case PointActionTypes.POINTS_METADATA_RETRIEVED:
      return {...state, metadata: action.payload};
    case PointActionTypes.SAVE_POINT:
      return {...state};
    case PointActionTypes.POINT_SELECTED:
      return {...state, pointSelected: action.payload};
    case PointActionTypes.CLEAR_POINT:
      return {...state, pointSelected: null};
    case PointActionTypes.TOGGLE_DIALOG:
      return {...state, dialog: action.payload};
    default:
      return state;
  }
}
