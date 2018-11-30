import { Action } from '@ngrx/store';
import { PaginationOptionsInterface } from '../../shared/common-list/common-list-item/pagination-options.interface';
import { Device } from '../../shared/models/Device';

export enum DeviceActionTypes {
  GET_DEVICE = '[Device] Get one device',
  GET_ALL_DEVICES = '[Device] Get all devices',
  UPDATE_DEVICE = '[Device] Update device',
  DEVICE_SELECTED = '[Device] Selected Device',
  DEVICE_METADATA_RETRIEVED = '[Device] Metadata Retrieved',
  SAVE_DEVICE = '[Device] Save device',
  DELETE_DEVICE = '[Device] Delete device',
  DEVICES_RETRIEVED = '[Device] Retrievied succesfully',
  CLEAR_SELECTED_DEVICE = '[Device] Clear Selected',
  DEVICE_PATCHED_OK = '[Device] Save succesful',
  DEVICE_PATCHED_ERROR = '[Device] Patching Error'
}

export class GetDevice implements Action {
  readonly type = DeviceActionTypes.GET_DEVICE;
  constructor (readonly payload: {id: string}) { }
}

export class GetAllDevices implements Action {
  readonly type = DeviceActionTypes.GET_ALL_DEVICES;
}

export class SelectDeviceId implements Action {
  readonly type = DeviceActionTypes.DEVICE_SELECTED;
  constructor (readonly payload: {id: string}) { }
}

export class UpdateDevice implements Action {
  readonly type = DeviceActionTypes.UPDATE_DEVICE;
  constructor (readonly payload: {_id: string, body: Partial<Device>}) { }
}

export class DeviceMetadataRetrieved implements Action {
  readonly type = DeviceActionTypes.DEVICE_METADATA_RETRIEVED;
  constructor ( readonly payload: {metadata: PaginationOptionsInterface}) { }
}

export class SaveDevice implements Action {
  readonly type = DeviceActionTypes.SAVE_DEVICE;
  constructor (readonly payload: {body: Device}) { }
}

export class DeleteDevice implements Action {
  readonly type = DeviceActionTypes.DELETE_DEVICE;
  constructor (readonly payload: {id: number}) { }
}

export class DevicesRetrieved implements Action {
  readonly type = DeviceActionTypes.DEVICES_RETRIEVED;
  constructor (readonly payload: {devices: Array<Device>}) { }
}

export class DevicesClearSelected implements Action {
  readonly type = DeviceActionTypes.CLEAR_SELECTED_DEVICE;
}

export class DevicePatchedOk implements Action {
  readonly type = DeviceActionTypes.DEVICE_PATCHED_OK;
}

export class DevicePatchingError implements Action {
  readonly type = DeviceActionTypes.DEVICE_PATCHED_ERROR;
}

export type showLoaderTypes = GetAllDevices | GetDevice | UpdateDevice | DeleteDevice | SaveDevice;
export const showLoaderActions = [
  DeviceActionTypes.GET_ALL_DEVICES,
  DeviceActionTypes.GET_DEVICE,
  DeviceActionTypes.UPDATE_DEVICE,
  DeviceActionTypes.DELETE_DEVICE,
  DeviceActionTypes.SAVE_DEVICE
];

export type hideLoaderTypes = DevicesRetrieved | DevicePatchedOk | DevicePatchingError;
export const hideLoaderActions = [
  DeviceActionTypes.DEVICES_RETRIEVED,
  DeviceActionTypes.DEVICE_PATCHED_OK,
  DeviceActionTypes.DEVICE_PATCHED_ERROR
];

export type DeviceActions = GetAllDevices | GetDevice | UpdateDevice | DeleteDevice | SaveDevice |
  DevicesRetrieved | DevicePatchedOk | DevicePatchingError | SelectDeviceId | DevicesClearSelected |
  DeviceMetadataRetrieved;
