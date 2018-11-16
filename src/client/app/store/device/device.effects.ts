import {
  DeleteDevice,
  DeviceActionTypes,
  DeviceMetadataRetrieved,
  DevicesRetrieved,
  GetAllDevices,
  SaveDevice,
  SelectDeviceId
} from './device.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/app.interfaces';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/internal/operators';
import { HttpError } from '../shared/actions/error.actions';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Device } from '../../shared/models/Device';
import { DeviceService } from '../../shared/services/device.service';
import { SnackbarOpen } from '../shared/actions/snackbar.actions';
import { Router } from '@angular/router';

@Injectable()
export class DeviceEffects {
  constructor(
    private actions$: Actions,
    private deviceService: DeviceService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  @Effect()
  getAllDevices$ = this.actions$
    .ofType(DeviceActionTypes.GET_ALL_DEVICES)
    .pipe(
      switchMap((query: GetAllDevices) => this.deviceService.getAll(query.payload.paginationOptions)),
      map((devices: any) => new DevicesRetrieved({devices: devices})),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

  @Effect()
  saveDevice$ = this.actions$
    .ofType(DeviceActionTypes.SAVE_DEVICE)
    .pipe(
      switchMap((query: SaveDevice) => this.deviceService.create(query.payload.body)),
      map((devices: any) =>
        new SnackbarOpen({
          message: 'Dispositivo Creado',
          action: 'Success'
        })
      ),
      tap(() => this.router.navigate(['/devices'])),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

  @Effect()
  deleteDevice$ = this.actions$
    .ofType(DeviceActionTypes.DELETE_DEVICE)
    .pipe(
      switchMap((query: DeleteDevice) => this.deviceService.deleteById(query.payload.id)),
      map((devices: any) =>
        new SnackbarOpen({
          message: 'Dispositivo Borrado',
          action: 'Success'
        })
      ),
      tap(() => this.router.navigate(['/devices'])),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );
}
