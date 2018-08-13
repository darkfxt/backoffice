import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {switchMap, map} from 'rxjs/internal/operators';

import {
  GetTripTemplates,
  TripTemplatesRetrieved,
  GetEventsForTripTemplate,
  EventsRetrieved,
  TripTemplateActions, TripTemplateActionTypes, CreateTripTemplate
} from './trip-template.actions';
import {TripTemplate, TripTemplateWithMetadata} from '../../shared/models/TripTemplate';
import { TripTemplateService } from '../../shared/services/trip-template.service';

@Injectable()
export class TripTemplateEffects {
  constructor(private actions$: Actions, private TripTemplateServiceInstance: TripTemplateService) {
  }

  @Effect()
  getAllSegments$ = this.actions$
    .ofType(TripTemplateActionTypes.GET_TRIP_TEMPLATES)
    .pipe(
      switchMap((query: GetTripTemplates) => this.TripTemplateServiceInstance.getAll(query.payload)),
      map((tripTemplate: TripTemplateWithMetadata) => new TripTemplatesRetrieved(tripTemplate))
    );

  @Effect()
  createSegment$ = this.actions$
    .ofType(TripTemplateActionTypes.CREATE_TRIP_TEMPLATE)
    .pipe(
      switchMap((tripTemplate: CreateTripTemplate) => this.TripTemplateServiceInstance.create(tripTemplate.payload)),
      map((serverResponse: any) => new TripTemplatesRetrieved(serverResponse))
    );

}
