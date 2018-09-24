import { Action } from '@ngrx/store';
import { User } from '../../shared/models/User';

export enum UserActionTypes {
  SAVE_USER = '[User] Adding User',
  SAVE_USER_SUCCESS= '[User] Adding User Success',
  SAVE_USER_ERROR= '[User] Adding User Error',
  USER_SELECTED = '[User] Selected',
}


export class UserSelected implements Action {
  readonly type = UserActionTypes.USER_SELECTED;
  constructor(readonly payload: User) {
    this.payload = payload;
  }
}

export class SaveUser implements Action {
  readonly type = UserActionTypes.SAVE_USER;
  constructor(readonly payload: any) {
    this.payload = payload;
  }
}


export type UserActions = SaveUser | UserSelected;
