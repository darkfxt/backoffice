
import {
  PaginationOptions,
  PaginationOptionsInterface
} from '../../shared/common-list/common-list-item/pagination-options.interface';
import { LoggedUserInterface, User } from '../../shared/models/User';
import { UserActions, UserActionTypes } from './user.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface UserState extends EntityState<User> {
  metadata: PaginationOptionsInterface;
  userSelected?: User;
  loggedUser?: LoggedUserInterface;
}

export const adapter: EntityAdapter<User> = createEntityAdapter();

export const initialState: UserState = adapter.getInitialState({
  metadata: new PaginationOptions()
});

export function userReducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.GET_USERS:
      return {...state};
    case UserActionTypes.RETRIEVED_USERS:
      return adapter.addAll(action.payload, state);
    case UserActionTypes.SAVE_USER:
      return {...state};
    case UserActionTypes.USER_SELECTED:
      return {...state, userSelected: action.payload};
    case UserActionTypes.SAVE_USER_SUCCESS:
      return {...state};
    case UserActionTypes.SIGNIN_USER:
      return {...state};
    case UserActionTypes.USER_SIGNED:
      if (action.payload && action.payload.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
      }
      return {...state, loggedUser: action.payload.user};
    case UserActionTypes.SIGNOUT_USER:
      localStorage.removeItem('currentUser');
      return {...state, loggedUser: null};
    default:
      return state;
  }
}
