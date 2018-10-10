import { AccountActions, AccountActionTypes } from './account.actions';

import { Account } from '../../shared/models/Account';
import {
  PaginationOptions,
  PaginationOptionsInterface
} from '../../shared/common-list/common-list-item/pagination-options.interface';
import { DialogActions } from '../dialog-actions.enum';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface State extends EntityState<Account> {
  metadata: PaginationOptionsInterface;
  accountSelected?: Account;
  dialog?: DialogActions;
}

export const adapter: EntityAdapter<Account> = createEntityAdapter();

export const initialState: State = adapter.getInitialState({
  metadata: new PaginationOptions()
});

export function accountReducer(state = initialState, action: AccountActions): State {
  switch (action.type) {
    case AccountActionTypes.GET_ACCOUNTS:
      return {...state};
    case AccountActionTypes.RETRIEVED_ACCOUNTS:
      return adapter.addAll(action.payload, state);
    case AccountActionTypes.SAVE_ACCOUNT:
      return {...state};
    case AccountActionTypes.ACCOUNT_SELECTED:
      return {...state, accountSelected: action.payload};
    default:
      return state;
  }
}
