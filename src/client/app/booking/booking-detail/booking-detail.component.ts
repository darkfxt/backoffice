import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../store/shared/app.interfaces';
import { select, Store } from '@ngrx/store';
import { BookingPatchedOk, BookingsClearSelected, SaveBooking, UpdateBooking } from '../../store/booking/booking.actions';
import { Booking, Status } from '../../shared/models/Booking';
import { Observable, Subscription } from 'rxjs';
import { getBookingSelected } from '../../store/booking';
import { GetAllDevices } from '../../store/device/device.actions';
import { SnackbarOpen } from '../../store/shared/actions/snackbar.actions';
import { DayOfTrip, Event } from '../../shared/models/TripTemplate';
import { BookingService } from '../../shared/services/booking.service';
import { ShareModalComponent } from '../../shared/share-modal/share-modal.component';
import { MatDialog } from '@angular/material';
import {TRANSLATE} from '../../translate-marker';
import {TranslateService} from '@ngx-translate/core';

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
  statusType = Status;
  stepper = {
    header: false,
    itinerary: true,
    publish: true
  };

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>,
              private bs: BookingService,
              private dialog: MatDialog,
              private ts: TranslateService
  ) {
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
      booking_reference: [this.booking.booking_reference],
      comment: [this.booking.comment],
      device_id: [this.booking.gps_device ? this.booking.gps_device : undefined],
      pickup_point: [this.booking.gps_device && this.booking.gps_device.pick_up ? this.booking.gps_device.pick_up : undefined],
      dropoff_point: [this.booking.gps_device && this.booking.gps_device.drop_off ? this.booking.gps_device.drop_off : undefined]
    });
    this.formItinerary = this.fb.array(this.booking.days || [new DayOfTrip( [])]);
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
    const booking: any = new Booking();
    Object.assign(booking, {days: this.formItinerary.value}, this.formHeader.value);
    booking.end_date = new Date(booking.start_date);
    booking.end_date.setDate(booking.end_date.getDate() + booking.days.length);
    return booking;
  }

  publishBooking(status) {
    if (this.validateItinerary()) {
      this.saveBooking(status);
      this.published = true;
    } else
      this.store.dispatch(new SnackbarOpen({
        message: this.ts.instant(TRANSLATE('No se puede publicar, el evento no tiene un origen/destino definido')),
        action: 'error'
      }));
  }

  validateItinerary() {
    const itinerary = this.formItinerary.value;
    let invalidEvents: Array<Event> = [];
    itinerary.forEach((day) => {
      invalidEvents = invalidEvents.concat(day.events.filter( (event: Event) => {
        return (event.event_type === 'driving') && (event.product.origin === null || event.product.destination === null);
      }));
    });
    return invalidEvents.length <= 0;
  }

  exportFile(type) {
    if (!this.validateItinerary())
      return this.store.dispatch(new SnackbarOpen({
        message: TRANSLATE('File cannot be exported because there are incomplete fields, please check the itinerary'),
        action: 'error'
      }));

    this.bs.exportFile(this.booking._id, type).subscribe(res => {
      const contentType = type === 'pdf' ? 'application/pdf' : 'Content-Disposition';
      const blob = new Blob([res], { type: contentType});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = this.booking.name + ' - ' + this.booking.passenger_name + '.' + type;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the element
    });
  }

  setStep(step) {
    Object.keys(this.stepper).forEach(field => {
      this.stepper[field] = true;
    });
    this.stepper[step] = false;
    window.scroll(0, 0);
  }

  shareBooking(booking) {
    if (!this.validateItinerary())
      return this.store.dispatch(new SnackbarOpen({
        message: TRANSLATE('You cannot share the trip because there are incomplete fields, please check the itinerary'),
        action: 'error'
      }));

    const basePath = location.host.indexOf('local.') > -1 || location.host.indexOf('develop.') > -1 ? 'dev.appv2.taylorgps.com' : 'appv2.taylorgps.com';
    const dialogRef = this.dialog.open(ShareModalComponent, {
      width: '500px',
      maxWidth: '500px',
      data: {
        link: `https://${basePath}/trips/${booking._id}-${booking.name}?a=${booking.account_id.id}`
      },
      id: 'share',
      panelClass: 'share-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
