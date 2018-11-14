import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../store/shared/app.interfaces';
import { select, Store } from '@ngrx/store';
import {BookingPatchedOk, BookingsClearSelected, SaveBooking} from '../../store/booking/booking.actions';
import { Booking } from '../../shared/models/Booking';
import { Observable, Subscription } from 'rxjs';
import { getBookingSelected } from '../../store/booking';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {
  formHeader: FormGroup;
  formItinerary: FormArray;
  booking: Booking;
  resolverSubscription: Subscription;
  selectedBooking$: Observable<string>;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {
    this.selectedBooking$ = store.pipe(select(getBookingSelected));
  }

  ngOnInit() {
    this.selectedBooking$.subscribe( (selectedBooking: string) => {
      if (selectedBooking) {
        this.store.dispatch(new BookingsClearSelected());
        this.router.navigate([`/booking/${selectedBooking}`]);
      }
  });

    this.resolverSubscription = this.route.data.subscribe(( resp: any ) => {
      if (resp) {
        this.booking = resp.booking;
        this.booking.endDate = resp.booking.end_date;
        this.booking.startDate = resp.booking.start_date;
      }

    });
    this.formHeader = this.fb.group({
      name: [this.booking.name, Validators.required],
      account_id: [this.booking.account_id, Validators.required],
      passenger_name: [this.booking.passenger_name, Validators.required],
      start_date: [this.booking.startDate, Validators.required], // tslint:disable-line
      end_date: [this.booking.endDate, Validators.required], // tslint:disable-line
      booking_reference: this.booking.booking_reference,
      comment: this.booking.comment,
      device_id: '',
      pickup_point: '',
      dropoff_point: ''
    });
    this.formItinerary = this.fb.array(this.booking.days || []);
  }

  saveBooking() {
    if (this.formHeader.valid) {
      if (this.formItinerary.valid) {
        const booking = this.prepareToSave();
        this.store.dispatch(new SaveBooking({body: booking}));
      }
    } else
      Object.keys(this.formHeader.controls).forEach(field => {
        const control = this.formHeader.get(field);
        control.markAsTouched({onlySelf: true});
      });
  }

  goBack() {
    this.router.navigate(['/booking']);
  }

  updateItinerary(event) {
    this.formItinerary = event;
  }

  prepareToSave(): Booking {
    const booking: Booking = new Booking();
    Object.assign(booking, {days: this.formItinerary.value}, this.formHeader.value);
    return booking;
  }

}
