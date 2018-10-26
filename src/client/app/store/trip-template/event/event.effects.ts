import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, mergeMap, catchError, withLatestFrom, tap, concatMap } from 'rxjs/internal/operators';
import { of } from 'rxjs';
import { AddEvent, EventActionTypes } from './event.actions';
import { HttpError } from '../../shared/actions/error.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ToggleDialogPoint } from '../../place/place.actions';
import { DialogActions } from '../../dialog-actions.enum';
import { UpdateDay } from '../day/day.actions';
import { AppState } from '../../shared/app.interfaces';
import { Store } from '@ngrx/store';
import { DayOfTrip, Event } from '../../../shared/models/TripTemplate';
import { PlaceService } from '../../../shared/services/place.service';
import { RoutesService } from '../../../shared/services/routes.service';
import {ToggleSegmentDialog} from '../../route/route.actions';

@Injectable()
export class EventEffects {
  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private pointServiceInstance: PlaceService,
              private segmentServiceInstance: RoutesService) {
  }

  @Effect()
  selectEvent$ = this.actions$
    .ofType(EventActionTypes.EVENT_SELECTED)
    .pipe(
      switchMap((action: any) => {
        if (action.payload.type === 'POINT') {
          this.store.dispatch(new ToggleDialogPoint(DialogActions.CLOSE));
          return this.pointServiceInstance.getDetail(action.payload._id);
        } else {
          this.store.dispatch(new ToggleSegmentDialog(DialogActions.CLOSE));
          return this.segmentServiceInstance.getDetail(action.payload._id);
        }
      }),
      withLatestFrom(this.store),
      map((response: any) => {
        const event = new Event(response[0].name,
          response[0].description,
          response[1].events.typeForEvent,
          response[1].events.indexForEvent,
          response[1].days.selectedDay,
          response[0]);
        return {event, day: response[1].days.selectedDay }
      }),
      mergeMap((response: any) => [

        new AddEvent({event: response.event, day: response.day})
      ]),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

  @Effect()
  addEventToTemplate$ = this.actions$
    .ofType(EventActionTypes.ADD_EVENT)
    .pipe(
      switchMap((action: any) => of(action.payload)),
      withLatestFrom(this.store),
      map((response: any) => {
        const originalData = response[1].tripTemplates.entities[response[1].tripTemplates.selectedTripTemplate]
          .days.filter(day => day._id === response[1].days.selectedDay);
        const dayToUpdate: DayOfTrip = new DayOfTrip(originalData[0].events, originalData[0]._id);
        const events = originalData[0].events.length > 0 ? originalData[0].events.slice(0) : [];
        const newEvent = response[0].event;

        events.splice(+response[1].events.indexForEvent, 0, newEvent);
        dayToUpdate.events = events;
        return dayToUpdate;
        }),
      concatMap((response: any) => [new UpdateDay(response)]),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

}
