import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {switchMap, map} from 'rxjs/internal/operators';

import { SegmentActionTypes, GetSegments, FilterSegments, SegmentsRetrieved } from './route.actions';
import {SegmentWithMetadata} from '../../shared/models/Segment';
import {RoutesService} from '../../shared/services/routes.service';

@Injectable()
export class SegmentEffects {
  constructor(private actions$: Actions, private routeServiceInstance: RoutesService) {
  }

  @Effect()
  getAllSegments$ = this.actions$
    .ofType(SegmentActionTypes.GET_SEGMENTS)
    .pipe(
      switchMap((query: GetSegments) => this.routeServiceInstance.getAll(query.payload)),
      map((segments: SegmentWithMetadata) => new SegmentsRetrieved(segments))
    );

  @Effect()
  searchSegments$ = this.actions$
    .ofType(SegmentActionTypes.FILTER_SEGMENTS)
    .pipe(
      switchMap((query: FilterSegments) => this.routeServiceInstance.getAll(query.payload)),
      map((segments: SegmentWithMetadata) => new SegmentsRetrieved(segments))
    );
}
