import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/internal/operators';

import { AccountActionTypes, GetAccounts, AccountSelected, RetrievedAccountsSuccess } from './account.actions';
import { Account } from '../../shared/models/Account';
import { AccountsService } from '../../shared/services/accounts.service';

@Injectable()
export class AccountEffects {
  constructor(private actions$: Actions, private accountServiceInstance: AccountsService) {
  }

  @Effect()
  getAllAccounts$ = this.actions$
    .ofType(AccountActionTypes.GET_ACCOUNTS)
    .pipe(
      switchMap((query: GetAccounts) => this.accountServiceInstance.getAll(query.payload)),
      map((accounts: Account[]) => new RetrievedAccountsSuccess(accounts))
    );

  @Effect()
  saveAccount$ = this.actions$
    .ofType(AccountActionTypes.SAVE_ACCOUNT)
    .pipe(
      switchMap((query: any) => this.accountServiceInstance.upsert({id: query.payload.id, body: query.payload.body})),
      map((response: any) => new AccountSelected(Object.assign(new Account(), response.data[0])))
    );
}
