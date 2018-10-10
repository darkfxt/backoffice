import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/internal/operators';

import {
  SegmentActionTypes,
  GetSegments,
  FilterSegments,
  SegmentsRetrieved,
  SegmentSelected,
  SaveSegment, ClearSegment, SegmentsMetadataRetrieved
} from './route.actions';
import { SegmentWithMetadata, default as Segment } from '../../shared/models/Segment';
import { RoutesService } from '../../shared/services/routes.service';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { HideLoader, ShowLoader } from '../shared/actions/loader.actions';
import { MatDialog } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../shared/actions/error.actions';
import { SnackbarOpen } from '../shared/actions/snackbar.actions';



@Injectable()
export class SegmentEffects {
  constructor(private actions$: Actions,
              private matDialog: MatDialog,
              private routeServiceInstance: RoutesService) {
  }

  @Effect()
  getAllSegments$ = this.actions$
    .ofType(SegmentActionTypes.GET_SEGMENTS)
    .pipe(
      switchMap((query: GetSegments) => this.routeServiceInstance.getAll(query.payload)),
      mergeMap((segments: SegmentWithMetadata) => [
        new SegmentsRetrieved(segments.data),
        new SegmentsMetadataRetrieved(segments.metadata)
      ]),
      // map((segments: SegmentWithMetadata) => new SegmentsRetrieved(segments.data)),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

  @Effect()
  searchSegments$ = this.actions$
    .ofType(SegmentActionTypes.FILTER_SEGMENTS)
    .pipe(
      switchMap((query: FilterSegments) => this.routeServiceInstance.getAll(query.payload)),
      map((segments: SegmentWithMetadata) => new SegmentsRetrieved(segments.data))
    );

  @Effect()
  saveSegments$ = this.actions$
    .ofType(SegmentActionTypes.SAVE_SEGMENT)
    .pipe(
      switchMap((query: any) => this.routeServiceInstance.upsert({id: query.payload.id, body: query.payload.body})),
      mergeMap((response: any) => [
        new SegmentSelected(Object.assign(new Segment(), response.data[0])),
        new SnackbarOpen({
          message: 'Segmento Creado',
          action: 'Success'
        })
      ]),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );
}
