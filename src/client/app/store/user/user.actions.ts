import { Action } from '@ngrx/store';
import { LoginServerResponse, User } from '../../shared/models/User';

export enum UserActionTypes {
  SAVE_USER = '[User] Adding User',
  SAVE_USER_SUCCESS= '[User] Adding User Success',
  SAVE_USER_ERROR= '[User] Adding User Error',
  USER_SELECTED = '[User] Selected',
  GET_USERS = '[User] Retrieving Users',
  RETRIEVED_USERS = '[User] Retrieved Users',
  SIGNIN_USER = '[User] Signing In',
  USER_SIGNED = '[User] Signed In Succesfully',
  SIGNOUT_USER = '[User] Signing Out',
  USER_SIGNED_OUT = '[User] Signed Out'
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

export class UserSignedOut implements Action {
  readonly type = UserActionTypes.USER_SIGNED_OUT;
}

export type showLoaderTypes = GetUsers | SignInUser | SignOutUser | SaveUser;
export type hideLoaderTypes = UserSelected | SaveUserSuccess | UserSignedOut
  | RetrievedUsersSuccess | UserSignedIn;

export const showLoaderActions = [
  UserActionTypes.GET_USERS,
  UserActionTypes.SIGNIN_USER,
  UserActionTypes.SIGNOUT_USER,
  UserActionTypes.SAVE_USER
];
export const hideLoaderActions = [
  UserActionTypes.USER_SIGNED,
  UserActionTypes.USER_SELECTED,
  UserActionTypes.USER_SIGNED_OUT,
  UserActionTypes.SAVE_USER_SUCCESS,
  UserActionTypes.RETRIEVED_USERS
];

export type UserActions = SaveUser | UserSelected | SaveUserSuccess | UserSignedOut
  | RetrievedUsersSuccess | GetUsers | SignInUser | UserSignedIn | SignOutUser;
