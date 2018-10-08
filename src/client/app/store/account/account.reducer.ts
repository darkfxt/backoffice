import { AccountActions, AccountActionTypes } from './account.actions';

import { Account } from '../../shared/models/Account';
import { PaginationOptionsInterface } from '../../shared/common-list/common-list-item/pagination-options.interface';
import { accountSelector } from '../index';
import { DialogActions } from '../dialog-actions.enum';

export interface AccountState {
  loading: boolean;
  accounts: Account[];
  metadata: PaginationOptionsInterface;
  accountSelected?: Account;
  dialog?: DialogActions;
}

export const initialState: AccountState = {
  loading: false,
  accounts: null,
  metadata: {
    previousPageIndex: 0,
    pageIndex: 1,
    pageSize: 10,
    length: 0
  }
};

export function accountReducer(state = initialState, action: AccountActions): AccountState {
  switch (action.type) {
    case AccountActionTypes.GET_ACCOUNTS:
      return {...state, loading: true};
    case AccountActionTypes.RETRIEVED_ACCOUNTS:
      return {...state, loading: false, accounts: action.payload};
    case AccountActionTypes.SAVE_ACCOUNT:
      return {...state, loading: true};
    case AccountActionTypes.ACCOUNT_SELECTED:
      return {...state, loading: false, accountSelected: action.payload};
    default:
      return state;
  }
}
