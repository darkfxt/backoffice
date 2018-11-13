import { Device } from '../../shared/models/Device';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { DeviceActions, DeviceActionTypes } from './device.actions';
import { PaginationOptionsInterface } from '../../shared/common-list/common-list-item/pagination-options.interface';

export interface DeviceState extends EntityState<Device> {
  deviceSelected?: string;
  metadata?: PaginationOptionsInterface;
}

export const adapter: EntityAdapter<Device> = createEntityAdapter({
  selectId: (device: Device) => device.id
});

export const initialState: DeviceState = adapter.getInitialState({
});

export function deviceReducer(state= initialState, action: DeviceActions): DeviceState {
  switch (action.type) {
    case DeviceActionTypes.GET_DEVICE:
      return {...state};
    case DeviceActionTypes.GET_ALL_DEVICES:
      return {...state};
    case DeviceActionTypes.DEVICE_SELECTED:
      return {...state, deviceSelected: action.payload.id};
    case DeviceActionTypes.DEVICE_METADATA_RETRIEVED:
      return {...state, metadata: action.payload.metadata};
    case DeviceActionTypes.SAVE_DEVICE:
      return {...state};
    case DeviceActionTypes.UPDATE_DEVICE:
      return {...state};
    case DeviceActionTypes.DELETE_DEVICE:
      return {...state};
    case DeviceActionTypes.DEVICES_RETRIEVED:
      return adapter.addAll(action.payload.devices, state);
    case DeviceActionTypes.CLEAR_SELECTED_DEVICE:
      return {...state, deviceSelected: undefined};
    case DeviceActionTypes.DEVICE_PATCHED_OK:
      return {...state};
    case DeviceActionTypes.DEVICE_PATCHED_ERROR:
      return {...state};
    default:
      return state;
  }
}
