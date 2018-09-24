import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/internal/operators';

import { SegmentActionTypes, GetSegments, FilterSegments, SegmentsRetrieved, SegmentSelected } from './route.actions';
import { SegmentWithMetadata, default as Segment } from '../../shared/models/Segment';
import { RoutesService } from '../../shared/services/routes.service';

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

  @Effect()
  saveSegments$ = this.actions$
    .ofType(SegmentActionTypes.SAVE_SEGMENT)
    .pipe(
      switchMap((query: any) => this.routeServiceInstance.upsert({id: query.payload.id, body: query.payload.body})),
      map((response: any) => new SegmentSelected(Object.assign(new Segment(), response.data[0])))
    );
}
