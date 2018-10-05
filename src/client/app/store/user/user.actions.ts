import { Action } from '@ngrx/store';
import {LoginServerResponse, User} from '../../shared/models/User';

export enum UserActionTypes {
  SAVE_USER = '[User] Adding User',
  SAVE_USER_SUCCESS= '[User] Adding User Success',
  SAVE_USER_ERROR= '[User] Adding User Error',
  USER_SELECTED = '[User] Selected',
  GET_USERS = '[User] Retrieving Users',
  RETRIEVED_USERS = '[User] Retrieved Users',
  SIGNIN_USER = '[User] Signing In',
  USER_SIGNED = '[User] Signed In Succesfully',
  SIGNOUT_USER = '[User] Signing Out'
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

export class SaveUserSuccess implements Action {
  readonly type = UserActionTypes.SAVE_USER_SUCCESS;
}

export class GetUsers implements Action {
  readonly type = UserActionTypes.GET_USERS;
  constructor (readonly payload?: any) {
    this.payload = payload;
  }
}

export class RetrievedUsersSuccess implements Action {
  readonly type = UserActionTypes.RETRIEVED_USERS;
  constructor ( readonly payload: User[]) {
    this.payload = payload;
  }
}

export class SignInUser implements Action {
  readonly type = UserActionTypes.SIGNIN_USER;
  payload: any = {email: '', password: ''};
  constructor (email: string, password: string) {
    this.payload.email = email;
    this.payload.password = password;
  }
}

export class UserSignedIn implements Action {
  readonly type = UserActionTypes.USER_SIGNED;
  constructor (readonly payload: LoginServerResponse) {
    this.payload = payload;
  }
}

export class SignOutUser implements Action {
  readonly type = UserActionTypes.SIGNOUT_USER;
}

export type UserActions = SaveUser | UserSelected | SaveUserSuccess
  | RetrievedUsersSuccess | GetUsers | SignInUser | UserSignedIn | SignOutUser;
