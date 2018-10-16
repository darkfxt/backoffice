import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../shared/app.interfaces';
import * as fromAccounts from './account.reducer';

export interface AccountState {
  accounts: fromAccounts.State;
}

export interface State extends AppState {
  accounts: AccountState;
}

export const reducers = {
  accounts: fromAccounts.accountReducer
};

export const getAccountsState = createFeatureSelector<AccountState>('accounts');

export const getAccountEntity = createSelector(
  getAccountsState,
  (state: any) => state.entities
);

export const getAccountSelected = createSelector(
  getAccountsState,
  (state: any) => state.accountSelected
);

export const getAllAccounts = createSelector(
  getAccountEntity,
  entities => {
    return Object.keys(entities).map( id => entities[id]);
  }
);
