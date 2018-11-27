import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/shared/app.interfaces';
import { getBookingSelected } from '../../../store/booking';
import { Subscription } from 'rxjs';
import { TRANSLATE } from '../../../translate-marker';

const STATUS_CONVERTER = {
  0: TRANSLATE('DRAFT'),
  1: TRANSLATE('PUBLISHED'),
  2: TRANSLATE('CANCELED')
};

@Component({
  selector: 'app-booking-detail-status',
  templateUrl: './booking-detail-status.component.html',
  styleUrls: ['./booking-detail-status.component.scss']
})
export class BookingDetailStatusComponent implements OnInit, OnDestroy {

  @Input() booking;
  status;
  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.status = STATUS_CONVERTER[this.booking.status || 0];
  }

  ngOnDestroy() {
  }

}
