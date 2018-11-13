import { Action } from '@ngrx/store';
import { PaginationOptionsInterface } from '../../shared/common-list/common-list-item/pagination-options.interface';
import { Booking } from '../../shared/models/Booking';

export enum BookingActionTypes {
  GET_BOOKING = '[Booking] Get one booking',
  GET_ALL_BOOKINGS = '[Booking] Get all bookings',
  UPDATE_BOOKING = '[Booking] Update booking',
  BOOKING_SELECTED = '[Booking] Selected Booking',
  BOOKING_METADATA_RETRIEVED = '[Booking] Metadata Retrieved',
  SAVE_BOOKING = '[Booking] Save booking',
  DELETE_BOOKING = '[Booking] Delete booking',
  BOOKINGS_RETRIEVED = '[Booking] Retrievied succesfully',
  CLEAR_SELECTED_BOOKING = '[Booking] Clear Selected',
  BOOKING_PATCHED_OK = '[Booking] Save succesful',
  BOOKING_PATCHED_ERROR = '[Booking] Patching Error'
}

export class GetBooking implements Action {
  readonly type = BookingActionTypes.GET_BOOKING;
  constructor (readonly payload: {id: string}) { }
}

export class GetAllBookings implements Action {
  readonly type = BookingActionTypes.GET_ALL_BOOKINGS;
  constructor (readonly payload: {paginationOptions: PaginationOptionsInterface}) { }
}

export class SelectBookingId implements Action {
  readonly type = BookingActionTypes.BOOKING_SELECTED;
  constructor (readonly payload: {_id: string}) { }
}

export class UpdateBooking implements Action {
  readonly type = BookingActionTypes.UPDATE_BOOKING;
  constructor (readonly payload: {_id: string, body: Partial<Booking>}) { }
}

export class BookingMetadataRetrieved implements Action {
  readonly type = BookingActionTypes.BOOKING_METADATA_RETRIEVED;
  constructor ( readonly payload: {metadata: PaginationOptionsInterface}) { }
}

export class SaveBooking implements Action {
  readonly type = BookingActionTypes.SAVE_BOOKING;
  constructor (readonly payload: {body: Booking}) { }
}

export class DeleteBooking implements Action {
  readonly type = BookingActionTypes.DELETE_BOOKING;
  constructor (readonly payload: {bookingId: string}) { }
}

export class BookingsRetrieved implements Action {
  readonly type = BookingActionTypes.BOOKINGS_RETRIEVED;
  constructor (readonly payload: {bookings: Array<Booking>}) { }
}

export class BookingsClearSelected implements Action {
  readonly type = BookingActionTypes.CLEAR_SELECTED_BOOKING;
}

export class BookingPatchedOk implements Action {
  readonly type = BookingActionTypes.BOOKING_PATCHED_OK;
}

export class BookingPatchingError implements Action {
  readonly type = BookingActionTypes.BOOKING_PATCHED_ERROR;
}

export type showLoaderTypes = GetAllBookings | GetBooking | UpdateBooking | DeleteBooking | SaveBooking;
export const showLoaderActions = [
  BookingActionTypes.GET_ALL_BOOKINGS,
  BookingActionTypes.GET_BOOKING,
  BookingActionTypes.UPDATE_BOOKING,
  BookingActionTypes.DELETE_BOOKING,
  BookingActionTypes.SAVE_BOOKING
];

export type hideLoaderTypes = BookingsRetrieved | BookingPatchedOk | BookingPatchingError;
export const hideLoaderActions = [
  BookingActionTypes.BOOKINGS_RETRIEVED,
  BookingActionTypes.BOOKING_PATCHED_OK,
  BookingActionTypes.BOOKING_PATCHED_ERROR
];

export type BookingActions = GetAllBookings | GetBooking | UpdateBooking | DeleteBooking | SaveBooking |
  BookingsRetrieved | BookingPatchedOk | BookingPatchingError | SelectBookingId | BookingsClearSelected |
  BookingMetadataRetrieved;
