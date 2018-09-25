
import { PaginationOptionsInterface } from '../../shared/common-list/common-list-item/pagination-options.interface';
import { User } from '../../shared/models/User';
import { UserActions, UserActionTypes } from './user.actions';

export interface UserState {
  loading: boolean;
  users: User[];
  metadata: PaginationOptionsInterface;
  userSelected?: User;
}

export const initialState: UserState = {
  loading: false,
  users: null,
  metadata: {
    previousPageIndex: 0,
    pageIndex: 1,
    pageSize: 10,
    length: 0
  }
};

export function userReducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.SAVE_USER:
      return {...state, loading: true};
    case UserActionTypes.USER_SELECTED:
      return {...state, loading: false, userSelected: action.payload};
    case UserActionTypes.SAVE_USER_SUCCESS:
      return {...state, loading: false};
    default:
      return state;
  }
}
