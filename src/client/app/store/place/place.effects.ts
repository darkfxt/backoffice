import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, mergeMap, catchError, delay, tap } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/index';
import { Action, Store } from '@ngrx/store';

import {
  PointActionTypes, GetPoints,
  FilterPoints, PointsRetrieved,
  PointMetadataRetrieved, PointSelected, SavePoint, ClearPoint, ToggleDialogPoint
} from './place.actions';
import { Point, PointWithMetadata } from '../../shared/models/Place';
import { PlaceService } from '../../shared/services/place.service';
import { MatDialog, PageEvent } from '@angular/material';
import { of } from 'rxjs';
import { HttpError } from '../shared/actions/error.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarOpen } from '../shared/actions/snackbar.actions';
import { HideLoader, ShowLoader } from '../shared/actions/loader.actions';
import { DialogActions } from '../dialog-actions.enum';
import { AppState } from '../shared/app.interfaces';

@Injectable()
export class PointEffects {
  constructor(private actions$: Actions,
              private matDialog: MatDialog,
              private placeServiceInstance: PlaceService,
              private store: Store<AppState>) {
  }

  @Effect()
  getAllPoints$ = this.actions$
    .ofType(PointActionTypes.GET_POINTS)
    .pipe(
      switchMap((query: GetPoints) => this.placeServiceInstance.getAll(query.payload)),
      mergeMap((points: PointWithMetadata) => [
        new PointsRetrieved(points.data),
        new PointMetadataRetrieved(points.metadata)
      ]),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

  @Effect()
  savePoint$ = this.actions$
    .ofType(PointActionTypes.SAVE_POINT)
    .pipe(
      switchMap((query: any) => this.placeServiceInstance.upsert({id: query.payload.id, body: query.payload.body})),
      mergeMap((response: any) => [
        new PointSelected(Object.assign(new Point(), response.data[0])),
        new SnackbarOpen({
          message: 'Lugar guardado'
        })
      ]),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

}
