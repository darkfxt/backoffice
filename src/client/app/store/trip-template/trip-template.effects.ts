  import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, mergeMap, catchError, withLatestFrom, tap, filter, delay } from 'rxjs/internal/operators';

import {
  GetTripTemplates,
  TripTemplatesRetrieved,
  TripTemplateActions,
  TripTemplateActionTypes,
  CreateTripTemplate,
  SaveTripTemplate,
  TripTemplateProcessedSuccesfully,
  TripTemplateSelected,
  TripTemplatesMetadataRetrieved, UpdateTripTemplate, ImportTripTemplate, FillItinerary
} from './trip-template.actions';
import {TripTemplate, TripTemplateWithMetadata, Event, DayOfTrip} from '../../shared/models/TripTemplate';
import { TripTemplateService } from '../../shared/services/trip-template.service';
  import { of } from 'rxjs';
  import { HttpError } from '../shared/actions/error.actions';
  import { HttpErrorResponse } from '@angular/common/http';
  import { SnackbarOpen } from '../shared/actions/snackbar.actions';
  import { ClearEvents, EventsRetrieved } from './event/event.actions';
  import { AppState } from '../shared/app.interfaces';
  import { Store } from '@ngrx/store';
  import {AddDay, DaysRetrieved} from './day/day.actions';
  import { BookingService } from '../../shared/services/booking.service';
  import {Booking} from '../../shared/models/Booking';

@Injectable()
export class TripTemplateEffects {
  constructor(private actions$: Actions,
              private TripTemplateServiceInstance: TripTemplateService,
              private BookingServiceInstance: BookingService,
              private store: Store<AppState>) {
  }

  @Effect()
  getAllTripTemplates$ = this.actions$
    .ofType(TripTemplateActionTypes.GET_TRIP_TEMPLATES)
    .pipe(
      switchMap((query: GetTripTemplates) => this.TripTemplateServiceInstance.getAll(query.payload)),
      mergeMap((tripTemplate: TripTemplateWithMetadata) => [
        new TripTemplatesRetrieved(tripTemplate.data),
        new TripTemplatesMetadataRetrieved(tripTemplate.metadata)
      ]),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

  @Effect()
  setDaysForSelectedTrip = this.actions$
    .ofType(TripTemplateActionTypes.TRIP_TEMPLATE_SELECTED)
    .pipe(
      switchMap((tripTemplateId: TripTemplateSelected) => this.TripTemplateServiceInstance.getDetail(tripTemplateId.payload)),
      map((response: any) => new DaysRetrieved(response.days)),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

  @Effect()
  importDaysFromAnotherTemplate = this.actions$
    .ofType(TripTemplateActionTypes.IMPORT_TRIP_TEMPLATE)
    .pipe(
      switchMap((tripTemplateId: ImportTripTemplate) => this.TripTemplateServiceInstance.getDetail(tripTemplateId.payload.tripTemplateId)),
      withLatestFrom(this.store),
      map((response: any) => {
        const selectedTemplate = response[1].tripTemplates.entities[response[1].tripTemplates.selectedTripTemplate];
        let updatedDays = selectedTemplate.days ? selectedTemplate.days.slice(0) : [];
        updatedDays = updatedDays.concat(response[0].days);
        const updated: TripTemplate =
          Object.assign({}, response[1].tripTemplates.entities[response[1].tripTemplates.selectedTripTemplate],
            {days: updatedDays});
        return new UpdateTripTemplate({tripTemplate: updated});
      }),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

  @Effect()
  importDaysFromBooking = this.actions$
    .ofType(TripTemplateActionTypes.FILL_ITINERARY)
    .pipe(
      switchMap((action: any) => of(action.payload)),
      withLatestFrom(this.store),
      map((response: any) => {
        const days = response[0].days.slice(0);
        const updated: TripTemplate =
          Object.assign({}, response[1].tripTemplates.entities[response[1].tripTemplates.selectedTripTemplate],
            {days});
        return new UpdateTripTemplate({tripTemplate: updated});
      }),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

  @Effect()
  updateTripTemplateDay$ = this.actions$
    .ofType(TripTemplateActionTypes.ADD_DAY_TO_SELECTED_TEMPLATE)
    .pipe(
      switchMap((action: any) => of(action.payload)),
      withLatestFrom(this.store),
      map((response: any) => new UpdateTripTemplate(
        Object.assign({}, response[1].tripTemplates.entities[response[1].tripTemplates.selectedTripTemplate], {days: response[0]}))),
      delay(1000),
      tap(() => this.store.dispatch(new ClearEvents())),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

   @Effect()
   addEventToEvents$ = this.actions$
     .ofType(TripTemplateActionTypes.SAVE_TRIP_TEMPLATE)
     .pipe(
       switchMap((tripTemplate: SaveTripTemplate) =>
         this.TripTemplateServiceInstance.upsert(tripTemplate.payload) ),
       mergeMap((serverResponse: any) => [
         new TripTemplateSelected(serverResponse.data[0]._id),
         new SnackbarOpen({
           message: 'Template Guardado',
           action: 'Success'
         })
       ]),
       catchError((e: HttpErrorResponse) => of(new HttpError(e)))
     );

}
