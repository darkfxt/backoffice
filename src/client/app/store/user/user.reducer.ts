
import { PaginationOptionsInterface } from '../../shared/common-list/common-list-item/pagination-options.interface';
import {LoggedUserInterface, User} from '../../shared/models/User';
import { UserActions, UserActionTypes } from './user.actions';

export interface UserState {
  loading: boolean;
  users: User[];
  metadata: PaginationOptionsInterface;
  userSelected?: User;
  loggedUser?: LoggedUserInterface;
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
    case UserActionTypes.GET_USERS:
      return {...state, loading: true};
    case UserActionTypes.RETRIEVED_USERS:
      return {...state, loading: false, users: action.payload};
    case UserActionTypes.SAVE_USER:
      return {...state, loading: true};
    case UserActionTypes.USER_SELECTED:
      return {...state, loading: false, userSelected: action.payload};
    case UserActionTypes.SAVE_USER_SUCCESS:
      return {...state, loading: false};
    case UserActionTypes.SIGNIN_USER:
      return {...state, loading: true};
    case UserActionTypes.USER_SIGNED:
      if (action.payload && action.payload.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
      }
      return {...state, loading: false, loggedUser: action.payload.user};
    case UserActionTypes.SIGNOUT_USER:
      localStorage.removeItem('currentUser');
      return {...state, loading: false, loggedUser: null};
    default:
      return state;
  }
}
