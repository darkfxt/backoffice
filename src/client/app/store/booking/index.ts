import * as fromBooking from './booking.reducer';
import { AppState } from '../shared/app.interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface BookingState {
  bookings: fromBooking.BookingState;
}

export interface State extends AppState {
  bookings: BookingState;
}

export const reducers = {
  bookings: fromBooking.bookingReducer
};

export const getBookingState = createFeatureSelector<BookingState>('bookings');

export const getBookingEntities = createSelector(
  getBookingState,
  (state: any) => state.entities
);

export const getBookingMetadata = createSelector(
  getBookingState,
  (state: any) => state.metadata
);

export const getBookingSelected = createSelector(
  getBookingState,
  (state: any) => state.bookingSelected
);

export const getAllBookings = createSelector(
  getBookingEntities,
  entities => {
    return Object.keys(entities).map(id => entities[id]);
  }
);
