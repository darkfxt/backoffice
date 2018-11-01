import { Booking } from '../../shared/models/Booking';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BookingActions, BookingActionTypes } from './booking.actions';

export interface BookingState extends EntityState<Booking> {
  bookingSelected?: string;
}

export const adapter: EntityAdapter<Booking> = createEntityAdapter({
  selectId: (booking: Booking) => booking._id
});

export const initialState: BookingState = adapter.getInitialState({
});

export function bookingReducer(state= initialState, action: BookingActions): BookingState {
  switch (action.type) {
    case BookingActionTypes.GET_BOOKING:
      return {...state};
    case BookingActionTypes.GET_ALL_BOOKINGS:
      return {...state};
    case BookingActionTypes.SAVE_BOOKING:
      return {...state};
    case BookingActionTypes.UPDATE_BOOKING:
      return {...state};
    case BookingActionTypes.DELETE_BOOKING:
      return {...state};
    case BookingActionTypes.BOOKINGS_RETRIEVED:
      return {...state};
    case BookingActionTypes.BOOKING_PATCHED_OK:
      return {...state};
    case BookingActionTypes.BOOKING_PATCHED_ERROR:
      return {...state};
    default:
      return state;
  }
}
