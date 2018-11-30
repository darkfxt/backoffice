import * as fromDevice from './device.reducer';
import { AppState } from '../shared/app.interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface DeviceState {
  devices: fromDevice.DeviceState;
}

export interface State extends AppState {
  devices: DeviceState;
}

export const reducers = {
  devices: fromDevice.deviceReducer
};

export const getDeviceState = createFeatureSelector<DeviceState>('devices');

export const getDeviceEntities = createSelector(
  getDeviceState,
  (state: any) => state.entities
);

export const getDeviceMetadata = createSelector(
  getDeviceState,
  (state: any) => state.metadata
);

export const getDeviceSelected = createSelector(
  getDeviceState,
  (state: any) => state.deviceSelected
);

export const getAllDevices = createSelector(
  getDeviceEntities,
  entities => {
    return Object.keys(entities).map(id => entities[id]);
  }
);
