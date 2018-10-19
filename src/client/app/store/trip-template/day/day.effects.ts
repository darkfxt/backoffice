import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, mergeMap, catchError, withLatestFrom } from 'rxjs/internal/operators';
import { of } from 'rxjs';
import { HttpError } from '../../shared/actions/error.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { DayActionTypes, DaySelected } from './day.actions';
import { AddDayToSelectedTemplate, UpdateDayOnSelectedTemplate } from '../trip-template.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/app.interfaces';

@Injectable()
export class DayEffects {
  constructor(private actions$: Actions,
              private store: Store<AppState>) {
  }

  @Effect()
  addDayToSelectedTrip = this.actions$
    .ofType(DayActionTypes.ADD_DAY)
    .pipe(
      switchMap((action: any) => of(action.payload)),
      mergeMap((response: any) => [
        new DaySelected(response),
        new AddDayToSelectedTemplate(response)
      ]),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

  @Effect()
  updateDayOnTrip = this.actions$
    .ofType(DayActionTypes.ADD_EVENT_TO_SELECTED_DAY)
    .pipe(

      switchMap((action: any) => of(action.payload)),
      withLatestFrom(this.store),
      map((payload: any) =>
        new UpdateDayOnSelectedTemplate({event: payload[0], selectedDay: payload[1].days.selectedDay})
      ),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );
}
