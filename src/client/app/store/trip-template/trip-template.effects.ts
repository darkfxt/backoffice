  import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {switchMap, map, mergeMap, catchError, withLatestFrom, tap, filter} from 'rxjs/internal/operators';

import {
  GetTripTemplates,
  TripTemplatesRetrieved,
  TripTemplateActions,
  TripTemplateActionTypes,
  CreateTripTemplate,
  SaveTripTemplate,
  TripTemplateProcessedSuccesfully,
  TripTemplateSelected,
  TripTemplatesMetadataRetrieved, UpdateTripTemplate
} from './trip-template.actions';
import { TripTemplate, TripTemplateWithMetadata, Event } from '../../shared/models/TripTemplate';
import { TripTemplateService } from '../../shared/services/trip-template.service';
  import { of } from 'rxjs';
  import { HttpError } from '../shared/actions/error.actions';
  import { HttpErrorResponse } from '@angular/common/http';
  import { SnackbarOpen } from '../shared/actions/snackbar.actions';
  import { EventsRetrieved } from './event/event.actions';
  import { AppState } from '../shared/app.interfaces';
  import { Store } from '@ngrx/store';
  import { DaysRetrieved } from './day/day.actions';

@Injectable()
export class TripTemplateEffects {
  constructor(private actions$: Actions,
              private TripTemplateServiceInstance: TripTemplateService,
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

  // @Effect()
  // createTripTemplate$ = this.actions$
  //   .ofType(TripTemplateActionTypes.CREATE_TRIP_TEMPLATE)
  //   .pipe(
  //     switchMap((tripTemplate: CreateTripTemplate) => this.TripTemplateServiceInstance.create(tripTemplate.payload)),
  //     mergeMap((serverResponse: any) => [
  //       new TripTemplatesRetrieved(serverResponse),
  //       new SnackbarOpen({
  //         message: 'Template creado',
  //         action: 'Success'
  //       })
  //     ]),
  //     catchError((e: HttpErrorResponse) => of(new HttpError(e)))
  //   );

  @Effect()
  setDaysForSelectedTrip = this.actions$
    .ofType(TripTemplateActionTypes.TRIP_TEMPLATE_SELECTED)
    .pipe(
      switchMap((tripTemplateId: TripTemplateSelected) => this.TripTemplateServiceInstance.getDetail(tripTemplateId.payload)),
      map((response: any) => new DaysRetrieved(response.days)),
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
