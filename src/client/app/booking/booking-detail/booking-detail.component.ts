import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../store/shared/app.interfaces';
import { select, Store } from '@ngrx/store';
import { BookingPatchedOk, BookingsClearSelected, SaveBooking, UpdateBooking } from '../../store/booking/booking.actions';
import {Booking, Status} from '../../shared/models/Booking';
import { Observable, Subscription } from 'rxjs';
import { getBookingSelected } from '../../store/booking';
import { GetAllDevices } from '../../store/device/device.actions';
import { SnackbarOpen } from '../../store/shared/actions/snackbar.actions';
import {Event} from '../../shared/models/TripTemplate';
import {BookingService} from '../../shared/services/booking.service';

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
  published: boolean;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>,
              private bs: BookingService) {
    this.selectedBooking$ = store.pipe(select(getBookingSelected));
  }

  ngOnInit() {
    this.store.dispatch(new GetAllDevices());

    this.selectedBooking$.subscribe( (selectedBooking: string) => {
      if (selectedBooking) {
        this.store.dispatch(new BookingsClearSelected());
        if (this.published)
          this.router.navigate([`/booking/`]);
        else
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
      end_date: [{value: this.booking.endDate, disabled: true}], // tslint:disable-line
      booking_reference: this.booking.booking_reference,
      comment: this.booking.comment,
      device_id: this.booking.gps_device ? this.booking.gps_device : '',
      pickup_point: this.booking.gps_device && this.booking.gps_device.pick_up ? this.booking.gps_device.pick_up : '',
      dropoff_point: this.booking.gps_device && this.booking.gps_device.drop_off ? this.booking.gps_device.drop_off : ''
    });
    this.formItinerary = this.fb.array(this.booking.days || []);
  }

  saveBooking(status?: Status) {
    if (this.formHeader.valid) {
      if (this.formItinerary.valid) {
        const booking = this.prepareToSave();
        if (status)
          booking.status = status;
        if (this.booking._id === 'new' || this.booking._id === undefined)
          this.store.dispatch(new SaveBooking({body: booking}));
         else
          this.store.dispatch(new UpdateBooking({_id: this.booking._id, body: booking}));
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

  publishBooking() {
    if (this.validateItinerary()) {
      this.published = true;
      this.saveBooking(Status.PUBLISHED);
    } else
      this.store.dispatch(new SnackbarOpen({
        message: 'No se puede publicar, el evento no tiene un origen/destino definido',
        action: 'error'
      }));
  }

  validateItinerary() {
    const itinerary = this.formItinerary.value;
    let invalidEvents: Array<Event> = [];
    itinerary.forEach((day) => {
      invalidEvents = invalidEvents.concat(day.events.filter( (event: Event) => {
        return (event.eventType === 'DRIVING') && (event.product.origin === null || event.product.destination === null);
      }));
    });
    return invalidEvents.length <= 0;
  }

  exportGPS() {

    this.bs.exportGPX(this.booking._id).subscribe(res => {
      const blob = new Blob([res], { type: 'Content-Disposition'});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = this.booking._id + '.gpx';
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the element
    });
  }

}
