import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {switchMap, map} from 'rxjs/internal/operators';

import {
  GetTripTemplates,
  TripTemplatesRetrieved,
  GetEventsForTripTemplate,
  EventsRetrieved,
  TripTemplateActions, TripTemplateActionTypes
} from './trip-template.actions';
import { TripTemplateWithMetadata } from '../../shared/models/TripTemplate';
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
      map((segments: TripTemplateWithMetadata) => new TripTemplatesRetrieved(segments))
    );

}
