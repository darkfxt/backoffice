import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../shared/app.interfaces';
import * as fromUsers from './user.reducer';

export interface UserState {
  users: fromUsers.UserState;
}

export interface State extends AppState {
  users: UserState;
}

export const reducers = {
  users: fromUsers.userReducer
};

export const getUsersState = createFeatureSelector<UserState>('users');

export const getUserEntities = createSelector(
  getUsersState,
  (state: any) => state.entities
);

export const getUserLogged = createSelector(
  getUsersState,
  (state: any) => state.loggedUser
);

export const getAllUsers = createSelector(
  getUserEntities,
  entities => {
    return Object.keys(entities).map(id => entities[id]);
  }
);
