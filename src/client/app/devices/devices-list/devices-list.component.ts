import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/shared/app.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../shared/models/Account';
import {
  PaginationOptions,
  PaginationOptionsInterface
} from '../../shared/common-list/common-list-item/pagination-options.interface';
import { Observable, Subscription } from 'rxjs';
import { ListItemComponent } from '../../shared/common-list/common-list-item/common-list-item.component';
import { getBookingMetadata } from '../../store/booking';
import { selectLoaderEntity } from '../../store/shared/reducers';
import { DeviceSummarizedCardComponent } from './device-summarized-card/device-summarized-card.component';
import { Device } from '../../shared/models/Device';
import { GetAllDevices } from '../../store/device/device.actions';
import {getAllDevices} from '../../store/device';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit {
  @Input() selectMode ? = false;
  @Input() isDialog ? = false;
  @Input() dialogRef: any;
  @Output() selectedDevice: EventEmitter<any> = new EventEmitter<any>();

  devices$: Observable<Device[]>;
  metadata$: Observable<PaginationOptionsInterface>;
  loading = false;
  drawingComponent: ListItemComponent;
  paginationOptions: PaginationOptionsInterface = new PaginationOptions();
  _subscription: Subscription;
  totalElements: Number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.devices$ = this.store.pipe(select(getAllDevices));
    this._subscription = this.store.select(selectLoaderEntity).subscribe(loader => this.loading = loader.show);
    this.drawingComponent = new ListItemComponent( DeviceSummarizedCardComponent );
  }

  ngOnInit() {
    this.store.dispatch(new GetAllDevices());
    this.devices$.subscribe((metadata) => this.totalElements = (metadata && metadata.length) ? metadata.length : 0);
  }

  onButtonClick() {
    this.router.navigate(['/devices/new']);
  }

  goBack() {
    this.router.navigate(['/devices']);
  }

}
