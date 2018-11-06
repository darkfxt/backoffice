import { BookingActionTypes, BookingsRetrieved, GetAllBookings, SaveBooking } from './booking.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/app.interfaces';
import { catchError, map, switchMap } from 'rxjs/internal/operators';
import { HttpError } from '../shared/actions/error.actions';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Booking } from '../../shared/models/Booking';
import { BookingService } from '../../shared/services/booking.service';

@Injectable()
export class BookingEffects {
  constructor(
    private actions$: Actions,
    private bookingService: BookingService,
    private store: Store<AppState>
  ) { }

  @Effect()
  getAllBookings$ = this.actions$
    .ofType(BookingActionTypes.GET_ALL_BOOKINGS)
    .pipe(
      switchMap((query: GetAllBookings) => this.bookingService.getAll(query.payload.paginationOptions)),
      map((bookings: any) => new BookingsRetrieved({bookings: bookings.data})),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );

  @Effect()
  saveBooking$ = this.actions$
    .ofType(BookingActionTypes.SAVE_BOOKING)
    .pipe(
      switchMap((query: SaveBooking) => this.bookingService.create(query.payload.body)),
      map((bookings: Array<Booking>) => new BookingsRetrieved({bookings})),
      catchError((e: HttpErrorResponse) => of(new HttpError(e)))
    );
}
