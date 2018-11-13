import {
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
import { catchError, map, mergeMap, switchMap } from 'rxjs/internal/operators';
import { HttpError } from '../shared/actions/error.actions';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Device } from '../../shared/models/Device';
import { DeviceService } from '../../shared/services/device.service';
import { SnackbarOpen } from '../shared/actions/snackbar.actions';

@Injectable()
export class DeviceEffects {
  constructor(
    private actions$: Actions,
    private deviceService: DeviceService,
    private store: Store<AppState>
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
      mergeMap((devices: any) => [
        new DevicesRetrieved({devices: devices.data}),
        new SelectDeviceId({id: devices.data[0].id}),
        new SnackbarOpen({
          message: 'Dispositivo Creado',
          action: 'Success'
        })
      ]),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );
}
