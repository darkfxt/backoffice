import { Action } from '@ngrx/store';
import { PaginationOptionsInterface } from '../../shared/common-list/common-list-item/pagination-options.interface';
import { Booking } from '../../shared/models/Booking';

export enum BookingActionTypes {
  GET_BOOKING = '[Booking] Get one booking',
  GET_ALL_BOOKINGS = '[Booking] Get all bookings',
  UPDATE_BOOKING = '[Booking] Update booking',
  SAVE_BOOKING = '[Booking] Save booking',
  DELETE_BOOKING = '[Booking] Delete booking',
  BOOKINGS_RETRIEVED = '[Booking] Retrievied succesfully',
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

export class UpdateBooking implements Action {
  readonly type = BookingActionTypes.UPDATE_BOOKING;
  constructor (readonly payload: {_id: string, body: Partial<Booking>}) { }
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
  BookingsRetrieved | BookingPatchedOk | BookingPatchingError;
