import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, mergeMap, catchError, withLatestFrom, filter, concatMap } from 'rxjs/internal/operators';
import { of } from 'rxjs';
import { HttpError } from '../../shared/actions/error.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { DayActionTypes, DaySelected } from './day.actions';
import { AddDayToSelectedTemplate, UpdateDayOnSelectedTemplate, UpdateTripTemplate } from '../trip-template.actions';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../shared/app.interfaces';
import { getTripTemplateSelectedId } from '../index';
import { TripTemplate } from '../../../shared/models/TripTemplate';

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
      withLatestFrom(this.store),
      map((payload: any) => {
        const originalData = payload[1].tripTemplates.entities[payload[1].tripTemplates.selectedTripTemplate];
        const tripToUpdate: TripTemplate = Object.assign(new TripTemplate(), originalData);
        const days = originalData.days.length > 0 ? originalData.days.slice(0) : [];
        days.push(payload[0]);
        tripToUpdate.days = days;
        return tripToUpdate;
      }),
      concatMap((tripTemplate: TripTemplate) => [new UpdateTripTemplate({tripTemplate})]),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

   @Effect()
   updateDayOnTrip = this.actions$
     .ofType(DayActionTypes.UPDATE_DAY)
     .pipe(
       switchMap((action: any) => of(action.payload)),
       withLatestFrom(this.store),
       map((payload: any) => {
         const originalData = payload[1].tripTemplates.entities[payload[1].tripTemplates.selectedTripTemplate];
         const tripToUpdate: TripTemplate = Object.assign(new TripTemplate(), originalData);
         const days = originalData.days.length > 0 ? originalData.days.slice(0) : [];
         days.splice(days.map(day => day._id).indexOf(payload[0]._id), 1, payload[0]);
         tripToUpdate.days = days;
         return tripToUpdate;
       }),
       concatMap((tripTemplate: TripTemplate) => [new UpdateTripTemplate({tripTemplate})]),
       catchError((e: HttpErrorResponse) => of(new HttpError(e)))
     );
}
