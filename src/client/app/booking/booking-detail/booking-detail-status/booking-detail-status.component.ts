import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store/shared/app.interfaces';
import {getBookingSelected} from '../../../store/booking';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-booking-detail-status',
  templateUrl: './booking-detail-status.component.html',
  styleUrls: ['./booking-detail-status.component.scss']
})
export class BookingDetailStatusComponent implements OnInit, OnDestroy {

  @Input() booking;
  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
