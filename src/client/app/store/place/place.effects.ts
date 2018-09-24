import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/index';
import { Action } from '@ngrx/store';

import { PointActionTypes, GetPoints, FilterPoints, PointsRetrieved, PointSelected } from './place.actions';
import { Point, PointWithMetadata } from '../../shared/models/Place';
import { PlaceService } from '../../shared/services/place.service';
import { PageEvent } from '@angular/material';
import {default as Segment } from '../../shared/models/Segment';
import { SegmentActionTypes, SegmentSelected } from '../route/route.actions';

@Injectable()
export class PointEffects {
  constructor(private actions$: Actions, private placeServiceInstance: PlaceService) {
  }

  @Effect()
  getAllPoints$ = this.actions$
    .ofType(PointActionTypes.GET_POINTS)
    .pipe(
      switchMap((query: GetPoints) => this.placeServiceInstance.getAll(query.payload)),
      map((points: PointWithMetadata) => new PointsRetrieved(points))
    );

  @Effect()
  searchPoints$ = this.actions$
    .ofType(PointActionTypes.FILTER_POINTS)
    .pipe(
      switchMap((query: FilterPoints) => this.placeServiceInstance.getAll(query.payload)),
      map((points: PointWithMetadata) => new PointsRetrieved(points))
    );

  @Effect()
  savePoint$ = this.actions$
    .ofType(PointActionTypes.SAVE_POINT)
    .pipe(
      switchMap((query: any) => this.placeServiceInstance.upsert({id: query.payload.id, body: query.payload.body})),
      map((response: any) => new PointSelected(Object.assign(new Point(), response.data[0])))
    );
}
