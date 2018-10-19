import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, mergeMap, catchError, withLatestFrom } from 'rxjs/internal/operators';
import { of } from 'rxjs';
import { AddEvent, EventActionTypes } from './event.actions';
import { HttpError } from '../../shared/actions/error.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ToggleDialogPoint } from '../../place/place.actions';
import { DialogActions } from '../../dialog-actions.enum';
import { AddEventToSelectedDay } from '../day/day.actions';
import { AppState } from '../../shared/app.interfaces';
import { Store } from '@ngrx/store';
import { Event } from '../../../shared/models/TripTemplate';

@Injectable()
export class EventEffects {
  constructor(private actions$: Actions,
              private store: Store<AppState>) {
  }

  @Effect()
  selectEvent$ = this.actions$
    .ofType(EventActionTypes.EVENT_SELECTED)
    .pipe(
      switchMap((action: any) => of(action.payload)),
      mergeMap((response: any) => [
        new ToggleDialogPoint(DialogActions.CLOSE),
        new AddEvent(response)
      ]),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

  @Effect()
  addEventToTemplate$ = this.actions$
    .ofType(EventActionTypes.ADD_EVENT)
    .pipe(
      switchMap((action: any) => of(action.payload)),
      withLatestFrom(this.store),
      map((response: any) => new AddEventToSelectedDay(
        new Event(
            response[0].name,
            response[0].description,
            response[1].events.typeForEvent,
            response[1].events.indexForEvent,
            response[0])
        )
      ),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

}
