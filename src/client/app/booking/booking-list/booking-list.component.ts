import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PaginationOptions,
  PaginationOptionsInterface
} from '../../shared/common-list/common-list-item/pagination-options.interface';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/shared/app.interfaces';
import { ListItemComponent } from '../../shared/common-list/common-list-item/common-list-item.component';
import { Observable, Subscription } from 'rxjs';
import { Account } from '../../shared/models/Account';
import { Booking } from '../../shared/models/Booking';
import { GetAllBookings } from '../../store/booking/booking.actions';
import { selectLoaderEntity } from '../../store/shared/reducers';
import { getAllBookings, getBookingMetadata } from '../../store/booking';
import { BookingSummarizedCardComponent } from './booking-summarized-card/booking-summarized-card.component';
import { GetSegments } from '../../store/route/route.actions';
import { first } from 'rxjs/internal/operators';

const ALLOWED_PAGE_SIZE = [5, 10, 25, 50];

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

  @Input() selectMode ? = false;
  @Input() isDialog ? = false;
  @Input() dialogRef: any;
  @Output() selectedAccount: EventEmitter<Account> = new EventEmitter<Account>();

  bookings$: Observable<Booking[]>;
  metadata$: Observable<PaginationOptionsInterface>;
  loading = false;
  drawingComponent: ListItemComponent;
  paginationOptions: any = new PaginationOptions();
  _subscription: Subscription;
  totalElements: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.bookings$ = this.store.pipe(select(getAllBookings));
    this.metadata$ = this.store.pipe(select(getBookingMetadata));
    this._subscription = this.store.select(selectLoaderEntity).subscribe(loader => this.loading = loader.show);
    this.drawingComponent = new ListItemComponent(BookingSummarizedCardComponent);
  }

  ngOnInit() {
    this.route.queryParams.pipe(first()).subscribe((params) => {
      const setMetadata = {
        pageIndex: +(!params.pageIndex ? 0 : params.pageIndex),
        pageSize: +(!params.pageSize || !ALLOWED_PAGE_SIZE.includes(params.pageSize) ? 10 : params.pageSize)
      };
      if (this.paginationOptions.filter && this.paginationOptions.filter.search_name)
        setMetadata['search'] = this.paginationOptions.filter.search_name;
      else
        setMetadata['search'] = params.search;
      if (this.paginationOptions.self) {
        setMetadata['self'] = this.paginationOptions.filter.self || false;
      }
      this.paginationOptions = Object.assign({}, this.paginationOptions, setMetadata);
      // this.metadata$.subscribe(metadata => this.totalElements = metadata.length);
      this.store.dispatch(new GetAllBookings({paginationOptions: this.paginationOptions}));
    });
    this.metadata$.subscribe((bookings) => this.totalElements = (bookings && bookings.length) ? bookings.length : 0);
  }

  onPageChanged(event) {
    this.paginationOptions = Object.assign({}, this.paginationOptions, event);
    this.store.dispatch(new GetAllBookings({paginationOptions: this.paginationOptions}));
  }

  onButtonClick() {
    this.router.navigate(['/booking/new']);
  }

  goBack() {
    this.router.navigate(['/booking']);
  }

  onFilterChanged(event) {
    this.paginationOptions = Object.assign({}, this.paginationOptions, {search: event, pageIndex: 0, pageSize: 10});
    this.store.dispatch(new GetAllBookings({paginationOptions: this.paginationOptions}));
  }

  onSelfToggle(event) {
    this.paginationOptions = Object.assign({}, this.paginationOptions, {self: event, pageIndex: 0, pageSize: 10});
    this.store.dispatch(new GetAllBookings({paginationOptions: this.paginationOptions}));
  }
}
