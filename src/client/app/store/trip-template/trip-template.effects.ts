  import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {switchMap, map} from 'rxjs/internal/operators';

import {
  GetTripTemplates,
  TripTemplatesRetrieved,
  GetEventsForTripTemplate,
  EventsRetrieved,
  TripTemplateActions, TripTemplateActionTypes, CreateTripTemplate, SaveTripTemplate, TripTemplateProcessedSuccesfully, TripTemplateSelected
} from './trip-template.actions';
import {TripTemplate, TripTemplateWithMetadata, Event} from '../../shared/models/TripTemplate';
import { TripTemplateService } from '../../shared/services/trip-template.service';

@Injectable()
export class TripTemplateEffects {
  constructor(private actions$: Actions, private TripTemplateServiceInstance: TripTemplateService) {
  }

  @Effect()
  getAllTripTemplates$ = this.actions$
    .ofType(TripTemplateActionTypes.GET_TRIP_TEMPLATES)
    .pipe(
      switchMap((query: GetTripTemplates) => this.TripTemplateServiceInstance.getAll(query.payload)),
      map((tripTemplate: TripTemplateWithMetadata) => new TripTemplatesRetrieved(tripTemplate))
    );

  @Effect()
  createTripTemplate$ = this.actions$
    .ofType(TripTemplateActionTypes.CREATE_TRIP_TEMPLATE)
    .pipe(
      switchMap((tripTemplate: CreateTripTemplate) => this.TripTemplateServiceInstance.create(tripTemplate.payload)),
      map((serverResponse: any) => new TripTemplatesRetrieved(serverResponse))
    );

  @Effect()
  getEventsFromTemplate$ = this.actions$
    .ofType(TripTemplateActionTypes.GET_EVENTS_FOR_T_TEMPLATE)
    .pipe(
      switchMap((tripTemplate: GetEventsForTripTemplate) => this.TripTemplateServiceInstance.getEventsFromTripTemplate(tripTemplate.payload)),
      map((serverResponse: Event[]) => new EventsRetrieved(serverResponse))
    );

   @Effect()
   addEventToEvents$ = this.actions$
     .ofType(TripTemplateActionTypes.SAVE_TRIP_TEMPLATE)
     .pipe(
       switchMap((tripTemplate: SaveTripTemplate) => this.TripTemplateServiceInstance.upsert(tripTemplate.payload) ),
       map((serverResponse: any) => new TripTemplateSelected(Object.assign(new TripTemplate(), serverResponse.data[0])))
     );

}
