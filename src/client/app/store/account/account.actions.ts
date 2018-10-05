import { Action } from '@ngrx/store';
import { Account } from '../../shared/models/Account';

export enum AccountActionTypes {
  SAVE_ACCOUNT = '[Account] Adding Account',
  SAVE_ACCOUNT_SUCCESS= '[Account] Adding Account Success',
  SAVE_ACCOUNT_ERROR= '[Account] Adding Account Error',
  ACCOUNT_SELECTED = '[Account] Selected',
  CLEAR_ACCOUNT = '[Account] Clear',
  GET_ACCOUNTS = '[Account] Retrieving Accounts',
  RETRIEVED_ACCOUNTS = '[Account] Retrieved Accounts'
}


export class AccountSelected implements Action {
  readonly type = AccountActionTypes.ACCOUNT_SELECTED;
  constructor(readonly payload: Account) {
    this.payload = payload;
  }
}

export class SaveAccount implements Action {
  readonly type = AccountActionTypes.SAVE_ACCOUNT;
  constructor(readonly payload: any) {
    this.payload = payload;
  }
}

export class SaveAccountSuccess implements Action {
  readonly type = AccountActionTypes.SAVE_ACCOUNT_SUCCESS;
}

export class GetAccounts implements Action {
  readonly type = AccountActionTypes.GET_ACCOUNTS;
  constructor (readonly payload?: any) {
    this.payload = payload;
  }
}

export class RetrievedAccountsSuccess implements Action {
  readonly type = AccountActionTypes.RETRIEVED_ACCOUNTS;
  constructor ( readonly payload: Account[]) {
    this.payload = payload;
  }
}

export type AccountActions = SaveAccount | AccountSelected | SaveAccountSuccess
  | RetrievedAccountsSuccess | GetAccounts ;
