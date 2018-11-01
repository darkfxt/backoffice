import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { HideLoader, ShowLoader } from './actions/loader.actions';
import { map } from 'rxjs/internal/operators';
import { Action } from '@ngrx/store';
import * as fromUser from '../user/user.actions';
import * as fromRoute from '../route/route.actions';
import * as fromPlace from '../place/place.actions';
import * as fromAccounts from '../account/account.actions';
import * as fromTemplates from '../trip-template/trip-template.actions';
import * as fromBooking from '../booking/booking.actions';

const showLoaderActions = [].concat(
  fromUser.showLoaderActions,
  fromRoute.showLoaderActions,
  fromPlace.showLoaderActions,
  fromAccounts.showLoaderActions,
  fromTemplates.showLoaderActions,
  fromBooking.showLoaderActions
);
const hideLoaderActions = [].concat(
  fromUser.hideLoaderActions,
  fromRoute.hideLoaderActions,
  fromPlace.hideLoaderActions,
  fromAccounts.hideLoaderActions,
  fromTemplates.hideLoaderActions,
  fromBooking.hideLoaderActions
);
type showLoaderTypes = fromUser.showLoaderTypes
                     & fromPlace.showLoaderTypes
                     & fromRoute.showLoaderTypes
                     & fromAccounts.showLoaderTypes
                     & fromTemplates.showLoaderTypes
                     & fromBooking.showLoaderTypes;
type hideLoaderTypes = fromUser.hideLoaderTypes
                     & fromPlace.hideLoaderTypes
                     & fromRoute.hideLoaderTypes
                     & fromAccounts.hideLoaderTypes
                     & fromTemplates.hideLoaderTypes
                     & fromBooking.hideLoaderTypes;
@Injectable()
export class AppEffects {

  constructor(private actions$: Actions,
              private matDialog: MatDialog) { }

  @Effect()
  showSpinner: Observable<Action> = this.actions$
    .ofType<showLoaderTypes>(...showLoaderActions)
    .pipe(map(() => new ShowLoader()));

  @Effect()
  hideSpinner: Observable<Action> = this.actions$
    .ofType<hideLoaderTypes>(...hideLoaderActions)
    .pipe(map(() => new HideLoader()));

}
